/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/<repo>",
  assetPrefix: "/<repo>/",
  // ...existing config...
}

module.exports = nextConfig
