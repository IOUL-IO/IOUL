import './globals.css';
import type { Metadata } from 'next';
import LegacyScripts from './legacy-scripts';

const legacyCssFiles = ['/IOUL-login/styles.css'];

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
      </body>
    </html>
  );
}