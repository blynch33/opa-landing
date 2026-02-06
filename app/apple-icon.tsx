import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#FAF9F5',
          borderRadius: 38,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 130,
            fontStyle: 'italic',
            color: '#C4725F',
            lineHeight: 1,
            marginTop: 8,
          }}
        >
          o
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
