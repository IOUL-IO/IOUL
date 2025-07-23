
import Head from 'next/head';

// Load IOUL-specific legacy stylesheet only for this route
const IOUL_CSS = '/IOUL-login/ioul/styles.css';

export default function IOULLocalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href={IOUL_CSS} />
      </Head>
      {children}
    </>
  );
}
