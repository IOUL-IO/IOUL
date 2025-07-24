// app/layout.tsx
import type { Metadata } from 'next';
import RouteStyles from './components/RouteStyles';
import LegacyScripts from './legacy-scripts';

export const metadata: Metadata = {
  title: 'IOUL',
  description: 'IOUL App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* --- keep page content and guideline 5 above layer‑five on non‑IOUL routes --- */}
        <style
          id="line-5-override"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
/* column‑mask layers. leave unchanged — apps rely on these z‑indexes */
.layer-one,.layer-two,.layer-three{pointer-events:none;position:fixed;inset:0;background:#fff;z-index:100}
.layer-four{pointer-events:none;position:fixed;inset:0;background:#fff;z-index:2}
.layer-five{pointer-events:none;position:fixed;inset:0;background:#fff;z-index:0}
            `,
          }}
        />
      </head>
      <body>
        <RouteStyles />
        {children}
        <LegacyScripts />
      </body>
    </html>
  );
}
