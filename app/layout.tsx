import React from 'react';

export const metadata = {
  title: 'IOUL',
  description: 'IOUL App'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}