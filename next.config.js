/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.deezer.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'e-cdns-images.dzcdn.net',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig; 