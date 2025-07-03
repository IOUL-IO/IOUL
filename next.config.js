/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      { source: '/', destination: '/legacy/index.html' },
      { source: '/:path*', destination: '/legacy/:path*' },
    ];
  },
};

module.exports = nextConfig;