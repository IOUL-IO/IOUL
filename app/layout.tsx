import './globals.css'
import Head from 'next/head'
import type { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/IOUL-login/styles.css" />
      </Head>
      <body className="non-fullscreen stage-login">
        {children}
      </body>
    </>
  )
}
