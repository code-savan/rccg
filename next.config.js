/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {},
  },
  images: {
    domains: [
      'azmbqvganixzipxpawgt.supabase.co',
      'localhost',
      '127.0.0.1',
      'https://www.rccgrogparish.com',
      'https://rccg1.vercel.app',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'azmbqvganixzipxpawgt.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;
