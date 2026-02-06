import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'OPA — Petty cash. Handled.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  const fontsDir = join(process.cwd(), 'app', 'fonts');

  const [frauncesMedium, frauncesItalic, interMedium] = await Promise.all([
    readFile(join(fontsDir, 'Fraunces-Medium.ttf')),
    readFile(join(fontsDir, 'Fraunces-Italic.ttf')),
    readFile(join(fontsDir, 'Inter-Medium.ttf')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#FAF9F5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontFamily: 'Fraunces Italic',
              fontSize: 180,
              color: '#C4725F',
              lineHeight: 1,
            }}
          >
            o
          </span>
          <span
            style={{
              fontFamily: 'Fraunces',
              fontSize: 180,
              color: '#134611',
              lineHeight: 1,
            }}
          >
            pa
          </span>
        </div>

        {/* Tagline */}
        <span
          style={{
            fontFamily: 'Inter',
            fontSize: 42,
            color: '#839788',
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}
        >
          Petty cash. Handled.
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Fraunces',
          data: frauncesMedium.buffer as ArrayBuffer,
          style: 'normal' as const,
          weight: 500 as const,
        },
        {
          name: 'Fraunces Italic',
          data: frauncesItalic.buffer as ArrayBuffer,
          style: 'italic' as const,
          weight: 400 as const,
        },
        {
          name: 'Inter',
          data: interMedium.buffer as ArrayBuffer,
          style: 'normal' as const,
          weight: 500 as const,
        },
      ],
    }
  );
}
