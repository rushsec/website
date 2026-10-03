import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { pathname } = request.nextUrl
  // Extract title from URL params or use default
  const segments = pathname.split('/').filter(Boolean)
  // Remove 'og' prefix
  segments.shift()
  
  const title = segments.length > 0 
    ? decodeURIComponent(segments.join(' / ')).replace(/-/g, ' ')
    : 'RushSec'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#0d1117',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          {/* Shield icon */}
          <svg width="60" height="60" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 25 L155 45 V90 C155 125 130 148 100 160 C70 148 45 125 45 90 V45 Z" stroke="#ff5a1f" strokeWidth="5" strokeLinejoin="round" />
            <path d="M78 66 L104 90 L78 114" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M110 66 L136 90 L110 114" stroke="#ff5a1f" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ color: '#e6edf3', fontSize: '36px', fontWeight: 600, marginLeft: '20px' }}>
            Rush<span style={{ color: '#ff5a1f' }}>Sec</span>
          </span>
        </div>
        <div style={{ color: '#e6edf3', fontSize: '48px', fontWeight: 600, lineHeight: 1.2, textTransform: 'capitalize' }}>
          {title}
        </div>
        <div style={{ color: '#8b949e', fontSize: '24px', marginTop: '20px' }}>
          Cybersecurity Labs & Tools
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
