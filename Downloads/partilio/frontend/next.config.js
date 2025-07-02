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
  // Disable TypeScript checking during build (opcional)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // IMPORTANTE: Remover 'output: export' para permitir SSR
  // Comentado: output: 'export',
  // Comentado: trailingSlash: true,
  
  // Permitir funcionalidades do Next.js
  experimental: {
    appDir: true,
  },
  
  // Configuração para Render.com
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig