import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'DS CARO — Global Senior Care & Mobility Solutions | B2B OEM/ODM Manufacturer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #5c3a2e 0%, #3a2318 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Warm gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 30% 50%, rgba(200,140,80,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(200,140,80,0.08) 0%, transparent 50%)',
          }}
        />

        {/* Top decorative line */}
        <div
          style={{
            position: 'absolute',
            top: 48,
            left: 80,
            right: 80,
            height: 1,
            background: 'linear-gradient(90deg, transparent, #c89050, transparent)',
          }}
        />

        {/* Bottom decorative line */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            left: 80,
            right: 80,
            height: 1,
            background: 'linear-gradient(90deg, transparent, #c89050, transparent)',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, zIndex: 10 }}>
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: '#f5ede0',
              letterSpacing: '0.15em',
              marginBottom: 8,
            }}
          >
            DS CARO
          </div>

          <div
            style={{
              width: 100,
              height: 3,
              background: '#c89050',
              marginBottom: 28,
            }}
          />

          <div
            style={{
              fontSize: 24,
              color: '#d4b896',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Long-Term Care Supply
          </div>

          <div
            style={{
              fontSize: 18,
              color: '#8a6a50',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            B2B OEM/ODM Manufacturer · Global Distribution
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 64,
            fontSize: 16,
            color: '#5a3a28',
            letterSpacing: '0.15em',
          }}
        >
          dscaro.com
        </div>
      </div>
    ),
    { ...size }
  )
}
