import './globals.css';
import type { Metadata } from 'next';
import LegacyScripts from './legacy-scripts';

const legacyCssFiles = [
  '/IOUL-login/styles.css',
  '/IOUL-login/center/add-ons/styles.css',
  '/IOUL-login/center/community/styles.css',
  '/IOUL-login/center/ioul center/styles.css',
  '/IOUL-login/center/library/styles.css',
  '/IOUL-login/ioul/styles.css',
  '/IOUL-login/tool-kit/cms/styles.css',
  '/IOUL-login/tool-kit/cms/docs/styles.css',
  '/IOUL-login/tool-kit/cms/forms/styles.css',
  '/IOUL-login/tool-kit/cms/sheets/styles.css',
  '/IOUL-login/tool-kit/coms/styles.css',
  '/IOUL-login/tool-kit/crm/styles.css',
  '/IOUL-login/tool-kit/erp/styles.css',
  '/IOUL-login/tool-kit/fms/styles.css',
  '/IOUL-login/tool-kit/hr/styles.css',
  '/IOUL-login/tool-kit/it/styles.css',
  '/IOUL-login/tool-kit/jobs/styles.css',
  '/IOUL-login/tool-kit/lms/styles.css',
  '/IOUL-login/tool-kit/ops/styles.css',
];

export const metadata: Metadata = {
  title: 'IOUL',
  description: 'IOUL App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {legacyCssFiles.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
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
        
  <script id="set-data-util" dangerouslySetInnerHTML={{__html:`document.documentElement.setAttribute('data-util','1');`}} />
</head>
      <body className="non-fullscreen stage-login">
        {children}
        <LegacyScripts />
      </body>
    </html>
  );
}