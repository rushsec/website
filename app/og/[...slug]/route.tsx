import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segments = pathname.split('/').filter(Boolean)
  // Remove 'og' prefix
  segments.shift()
  
  const rawTitle = segments.length > 0 
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
          backgroundColor: '#050a08',
          border: '1px solid #1c2b24',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          {/* Shield icon */}
          <svg width="64" height="64" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 12 L102 27 V60 C102 86 83 102 60 111 C37 102 18 86 18 60 V27 Z" stroke="#2bd97c" strokeWidth="4.5" strokeLinejoin="round" />
            <path d="M43 43 L63 60 L43 77" stroke="#dce8e1" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M67 43 L87 60 L67 77" stroke="#2bd97c" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '24px' }}>
            <span style={{ color: '#dce8e1', fontSize: '38px', fontWeight: 600, letterSpacing: '-0.5px' }}>
              Rush<span style={{ color: '#2bd97c' }}>Sec</span>
            </span>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
              <div style={{ width: '6px', height: '6px', backgroundColor: '#ff4d5e', borderRadius: '1px', marginRight: '8px' }}></div>
              <span style={{ color: '#7f948a', fontSize: '13px', fontFamily: 'monospace', letterSpacing: '1.5px' }}>
                SECURITY RESEARCH &amp; TOOLS
              </span>
            </div>
          </div>
        </div>

        <div style={{ color: '#dce8e1', fontSize: '50px', fontWeight: 600, lineHeight: 1.2, textTransform: 'capitalize', maxWidth: '1000px' }}>
          {rawTitle}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px', color: '#7f948a', fontSize: '20px', fontFamily: 'monospace' }}>
          <span style={{ color: '#2bd97c', marginRight: '8px' }}>&gt;</span>
          <span>rushsec.dev / legal &amp; ethical security research</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
