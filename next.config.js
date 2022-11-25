/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  target: "serverless",
  experimental: { nftTracing: true },
};

module.exports = nextConfig
