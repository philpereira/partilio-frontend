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
  // Disable TypeScript checking
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Force client-side rendering
  output: 'export',
  trailingSlash: true,
  // Disable static generation for pages with localStorage
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
