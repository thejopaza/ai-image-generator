This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Tasks
Moved to [Github Issues](https://github.com/thejopaza/ai-image-generator/issues)
- [ ] Host on Vercel
- [ ] Create UI mockups
- [ ] Choose the upscaler
- [ ] Choose a text prompt API (e.g. music lyrics, quotes)
- [ ] Choose where to host images
- [ ] Generate demo image using Stable Diffusion to test upscalers with
- [ ] Create an API endpoint that takes a text prompt, calls Stable Diffusion API, and download image
- [ ] Create an API endpoint that takes an image URL, upscales it, stores it, and then returns the url
- [ ] Create an API endpoint that calls the text prompt API, stores the text, and then starts the AI generator/upscaler workflow
- [ ] Create an API endpoint to serve image src
- [ ] Function to host downloaded images on some hosting site
- [ ] Create the front-end website to show text & AI image
- [ ] Research effective seed words to optimize AI images
- [ ] Research NLP / semantic analysis of text to enrich the text prompt

