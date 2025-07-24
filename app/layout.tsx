import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IOUL',
  description: 'IOUL application',
};

// Root layout without global CSS or scripts
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