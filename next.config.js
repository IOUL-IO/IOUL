/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  reactStrictMode: false,
  typescript: {
    // Skip build-time type checking (still works in IDE)
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
