/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  env: {
    ALCHEMY_KEY: process.env.NEXT_ALCHEMY_KEY,
  }
};

module.exports = nextConfig;
