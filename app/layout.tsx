import './globals.css';
import type { Metadata } from 'next';
import LegacyScripts from './legacy-scripts';
import GlobalLine5Guard from './components/GlobalLine5Guard';

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
      </head>
      <body className="non-fullscreen stage-login">
        {children}
        <LegacyScripts />
          <GlobalLine5Guard />
        </body>
    </html>
  );
}