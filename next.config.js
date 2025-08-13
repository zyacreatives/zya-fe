/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    // Enable standalone output for Docker
    outputFileTracingRoot: process.cwd(),
  },
};

export default nextConfig;
