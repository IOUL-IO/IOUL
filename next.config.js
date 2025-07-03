
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/center/ioul%20center/:path*',
        destination: '/center/ioul-center/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
