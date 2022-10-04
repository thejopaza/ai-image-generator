// https://www.npmjs.com/package/@grpc/proto-loader
const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
const path = require("path");

const currentDir = process.cwd()
const packageDefinition = protoLoader.loadSync(
  `${currentDir}/proto/generation.proto`
);
const { gooseai } = grpc.loadPackageDefinition(packageDefinition);
// console.log({ gooseai });

// https://grpc.io/docs/guides/auth/
const metaCallback = (_params, callback) => {
  const meta = new grpc.Metadata();
  meta.add("authorization", `bearer ${process.env.STABILITY_API_KEY}`);
  callback(null, meta);
};

const channelCreds = grpc.credentials.createSsl();
const callCreds = grpc.credentials.createFromMetadataGenerator(metaCallback);
const combCreds = grpc.credentials.combineChannelCredentials(
  channelCreds,
  callCreds
);

export default async function handler(req, res) {
  // https://cloudnweb.dev/2019/05/what-is-grpc-how-to-implement-grpc-in-node-js/
  const client = new gooseai.GenerationService("grpc.stability.ai:443", combCreds);
  // console.log({ client });

  const request = {
    engineId: "stable-diffusion-v1-5",
    requestId: "dsjjfsdk9903dflkdsff29943243ddksdks",
    prompt: [
      {
        text: "Dramatic Half-elf Druid from an aristocratic family who is tracking down the treasure their father died trying to find. Colorful, illustratin, insanely detailed, intricate, 8k, dramatic lighting, beautiful, epic composition, octane render",
      },
    ],
    image: {
      height: 512,
      width: 512,
      seed: 0,
      steps: 50,
      samples: 1,
    },
  };

  // console.log({ request });
  let imgSrc = "";
  const answer = await client.Generate(request);
  // console.log(answer);
  answer.on("data", (point) => {
    console.log({ point });
    if (point.artifacts) {
      for (const artifact of point.artifacts) {
        if (artifact.mime === "image/png") {
          console.log({ artifact });
          imgSrc = `data:image/png;base64,${artifact.binary.toString("base64")}`;
          res.status(200).json({ imageBinary: imgSrc });
        }
      }
    }
  });

  // processArtifactsFromAnswers("this", answers);

  // res.status(200).json({ imageBinary: imgSrc });
  // change to 202? send promise?
}

// function processArtifactsFromAnswers(prefix, answers, write = true) {
//   let idx = 0;
//   console.log({ answers });

//   for (const resp in answers) {
//     for (const artifact in resp.artifacts) {
//       const artifact_p = `${prefix}-${resp.request_id}-${resp.answer_id}-${idx}`;
//       if (artifact.type === gooseai.ARTIFACT_IMAGE) {
//         const ext = mime.extension(artifact.mime);
//         const contents = artifact.binary;
//         console.log({ contents });
//       }
//     }
//   }
// }
