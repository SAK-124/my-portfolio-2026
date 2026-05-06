import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
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
