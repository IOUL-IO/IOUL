import { promises as fs } from 'fs';
import path from 'path';
import Head from 'next/head';

type PageProps = {
  html: string;
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', `tool-kit/it/index.html`);
  const html = await fs.readFile(filePath, 'utf-8');
  return { props: { html } };
}

export default function StaticWrappedPage({ html }: PageProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
      </Head>
      <div dangerouslySetInnerHTML={ { __html: html } } />
    </>
  );
}