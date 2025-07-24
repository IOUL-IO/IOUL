import type { Metadata } from 'next';
import RouteStyles from './components/RouteStyles';

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
      <body>
        {/* Inject the CSS file that matches the current route */}
        <RouteStyles />
        {children}
      </body>
    </html>
  );
}
