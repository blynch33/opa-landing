import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// iOS applies its own corner mask, so the tile is full-bleed accent green.
export default async function AppleIcon() {
  const interMedium = await readFile(join(process.cwd(), 'app', 'fonts', 'Inter-Medium.ttf'));

  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#1F7A3A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontFamily: 'Inter', fontSize: 132, color: '#FFFFFF', lineHeight: 1, marginTop: -14 }}>o</span>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Inter', data: interMedium.buffer as ArrayBuffer, style: 'normal' as const, weight: 500 as const }],
    }
  );
}
