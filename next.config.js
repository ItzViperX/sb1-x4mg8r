/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@firebase/auth': '@firebase/auth/dist/esm2017/index.js',
    };
    return config;
  },
};

module.exports = nextConfig;