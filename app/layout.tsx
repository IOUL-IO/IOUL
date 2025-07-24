import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IOUL',
  description: 'IOUL application',
};

// Minimal root layout — no global CSS or scripts
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}