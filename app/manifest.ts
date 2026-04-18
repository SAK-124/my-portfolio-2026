import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Saboor Ali Khan',
    short_name: 'Saboor',
    description:
      'Portfolio of Saboor Ali Khan: IBA Marketing student and Digital Marketing Intern at 10Pearls, focused on SEO and marketing automation.',
    start_url: '/',
    display: 'standalone',
    background_color: '#141716',
    theme_color: '#141716',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
