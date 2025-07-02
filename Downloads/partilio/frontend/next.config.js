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
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig
