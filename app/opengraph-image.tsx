import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Saboor Ali Khan — Marketing Automation, Technical SEO, and Workflow Tools'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background:
            'linear-gradient(135deg, #f3efe7 0%, #ece6da 55%, #d9cfbd 100%)',
          fontFamily: 'sans-serif',
          color: '#1a1714',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#b06b28',
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: '#b06b28',
            }}
          />
          Portfolio · sabooralikhan.com
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div
            style={{
              fontSize: 100,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
              color: '#1a1714',
            }}
          >
            Saboor Ali Khan
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#3d352c',
              maxWidth: 960,
            }}
          >
            Marketing Automation · Technical SEO · AI Workflows · Workflow Tools
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 24,
            color: '#5e574e',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontWeight: 600, color: '#1a1714' }}>
              BBA Marketing · IBA Karachi
            </div>
            <div>Digital Marketing Intern · 10Pearls Pakistan</div>
          </div>
          <div style={{ fontWeight: 600, color: '#b06b28' }}>
            sabooralikhan.com
          </div>
        </div>
      </div>
    ),
    size,
  )
}
