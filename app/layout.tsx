import type { Metadata } from 'next';
import RouteStyles from './components/RouteStyles';
import localFont from 'next/font/local';

const distill = localFont({
  src: [
    { path: '/IOUL-login/font.woff2', weight: '400', style: 'normal' },
    { path: '/IOUL-login/font.woff', weight: '400', style: 'normal' },
  ],
  display: 'swap',
  preload: true,
});

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
    <html lang="en" className={distill.className}>
      <body style={{ overflow: 'hidden' }}>
        {/* Inject the CSS file that matches the current route */}
        <RouteStyles />
        {children}
      </body>
    </html>
  );
}
