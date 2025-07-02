/** @type {import('next').NextConfig} */
const nextConfig = {
  // The API is accessed via the "/api" proxy defined in `rewrites`
  compress: true,
  poweredByHeader: false,
  images: {
    domains: ['partilio-backend.onrender.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://partilio-backend.onrender.com/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
