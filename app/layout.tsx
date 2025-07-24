import type { Metadata } from 'next';
import LegacyScripts from './legacy-scripts';
import RouteStyles from './components/RouteStyles';



export const metadata: Metadata = {
  title: 'IOUL',
  description: 'IOUL App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        
        ))}
      {/* --- keep page content and guideline 5 above layer‑five on non‑IOUL routes --- */}
<style
  id="line-5-override"
  dangerouslySetInnerHTML={{
    __html: `
      :root:not([data-page=\"ioul\"]) .page-content {
        z-index: 540 !important;
      }
      :root:not([data-page=\"ioul\"]) .page-content .line.fifth,
      :root:not([data-page=\"ioul\"]) .page-content .util-line {
        z-index: 541 !important;
        opacity: 1 !important;
        pointer-events: auto !important;
      }
    `,
  }}
/>
        </head>
      <body>
        <RouteStyles /> className="non-fullscreen stage-login">
        {children}
        <LegacyScripts />
      </body>
    </html>
  );
}