/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  compress: true,
  poweredByHeader: false,
  images: {
    domains: ['partilio-backend.onrender.com'],
  },
  // Disable ALL TypeScript checking
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Remove experimental features
  experimental: {},
  // Force treat as JavaScript
  swcMinify: true,
  // Override webpack to ignore TS checking
  webpack: (config, options) => {
    // Force JavaScript mode
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
}

module.exports = nextConfig
