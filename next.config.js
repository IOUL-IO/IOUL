/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/tool-kit-cms',
        destination: '/tool-kit/cms',
        permanent: true
      }
    ]
  }
}
module.exports = nextConfig
};
