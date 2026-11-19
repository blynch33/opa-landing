import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'OPA — Petty cash. Handled.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Matches the app rebrand: neutral canvas, near-black label, grey secondary, one green accent.
export default async function TwitterImage() {
  const interMedium = await readFile(join(process.cwd(), 'app', 'fonts', 'Inter-Medium.ttf'));

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#F5F5F7',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter',
        }}
      >
        <span style={{ fontSize: 200, color: '#1D1D1F', letterSpacing: '-0.05em', lineHeight: 1 }}>opa</span>
        <span style={{ fontSize: 44, color: '#6E6E73', letterSpacing: '-0.02em', marginTop: 28 }}>
          Petty cash. <span style={{ color: '#1F7A3A', marginLeft: 12 }}>Handled.</span>
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Inter', data: interMedium.buffer as ArrayBuffer, style: 'normal' as const, weight: 500 as const }],
    }
  );
}
