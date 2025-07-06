"use client";
import React, { useEffect } from 'react';
import Head from 'next/head';

export default function Page() {
  useEffect(() => {
    // Execute legacy script logic
    const legacyScript = `(function() {  })();`;
    new Function(legacyScript)();
  }, []);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/IOUL-login/styles.css" />
      </Head>
      <div dangerouslySetInnerHTML={ __html: `` } />
    </>
  );
}
