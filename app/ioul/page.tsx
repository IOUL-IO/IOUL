import React, { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export default function Page() {
  useEffect(() => {
    // TODO: any JS init from legacy project can be ported here
  }, []);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/IOUL-login/ioul/styles.css" />
      </Head>
      <Script src="/IOUL-login/ioul/script.js" strategy="afterInteractive" />
      <div
        dangerouslySetInnerHTML={
          __html: ``
        }
      />
    </>
  );
}
