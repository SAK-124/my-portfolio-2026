import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: '/new/assets/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/new/guided/:path*',
        has: [{ type: 'query', key: 'v', value: '[a-f0-9]{12}' }],
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
  async rewrites() {
    return [{ source: '/new', destination: '/new/index.html' }]
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'sabooralikhan.com',
          },
        ],
        destination: 'https://www.sabooralikhan.com/:path*',
        permanent: true,
      },
    ]
  },
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
