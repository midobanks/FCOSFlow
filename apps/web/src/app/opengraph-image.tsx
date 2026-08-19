import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'FCOS Flow — Run every shift with confidence.';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 80px',
        backgroundColor: '#ffffff',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '36px',
        }}
      >
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            backgroundColor: '#0f766e',
          }}
        />
        <div style={{ fontSize: '32px', fontWeight: 600, color: '#1d1d1f' }}>FCOS Flow</div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: '76px',
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: '-1.5px',
          color: '#1d1d1f',
        }}
      >
        <div>Run every shift</div>
        <div>with confidence.</div>
      </div>
      <div
        style={{
          marginTop: '32px',
          fontSize: '28px',
          lineHeight: 1.4,
          color: '#707070',
          maxWidth: '860px',
        }}
      >
        The AI-assisted operating system for fulfillment centres.
      </div>
      <div
        style={{
          marginTop: '48px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            padding: '14px 36px',
            borderRadius: '999px',
            backgroundColor: '#0071e3',
            color: '#ffffff',
            fontSize: '24px',
            fontWeight: 500,
          }}
        >
          Steer your shift
        </div>
        <div
          style={{
            padding: '14px 36px',
            borderRadius: '999px',
            border: '2px solid #1d1d1f',
            color: '#1d1d1f',
            fontSize: '24px',
            fontWeight: 500,
          }}
        >
          Explore the product
        </div>
      </div>
    </div>,
    { ...size },
  );
}
