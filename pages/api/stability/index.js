import { v4 as uuidv4 } from "uuid";

// https://www.npmjs.com/package/@grpc/proto-loader
const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");

const currentDir = process.cwd();
const PROTO_PATH = "generation.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  includeDirs: ["proto","."],
});
const { gooseai } = grpc.loadPackageDefinition(packageDefinition);

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
  const { method, body } = req;
  const { prompt } = body;

  if (method === "POST") {
    try {
      if (!prompt || prompt.length < 5) {
        return res.status(400).end({
          status: "error",
          message: "Prompt is empty or too short.",
        });
      }
      const imageBinary = await generateImageFromPrompt(prompt);

      return res.status(200).json({
        status: "success",
        data: {
          imageBinary,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  return res.status(400).end({
    status: "error",
    message: "bad request",
  });
}

async function generateImageFromPrompt(prompt) {
  // https://cloudnweb.dev/2019/05/what-is-grpc-how-to-implement-grpc-in-node-js/
  const client = new gooseai.GenerationService(
    process.env.STABILITY_SERVICE_URL,
    combCreds
  );

  const requestId = uuidv4();
  const request = {
    engineId: "stable-diffusion-v1-5",
    requestId,
    prompt: [
      {
        text: prompt,
      },
    ],
    image: {
      height: 640,
      width: 512,
      seed: 0,
      steps: 50,
      samples: 1,
    },
  };

  const answer = await client.Generate(request);
  const imagePromise = new Promise(function (myResolve, myReject) {
    answer.on("data", (point) => {
      if (point.artifacts) {
        for (const artifact of point.artifacts) {
          if (artifact.mime === "image/png") {
            const imageBinary = `data:image/png;base64,${artifact.binary.toString(
              "base64"
            )}`;
            myResolve(imageBinary);
          }
        }
        myReject({ message: "No image generated" });
      }
    });
  });

  return await imagePromise;
}
