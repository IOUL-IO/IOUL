import fs from 'fs';
import path from 'path';
import Head from 'next/head';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  return {
    props: {
      html: bodyMatch ? bodyMatch[1] : html,
      title: titleMatch ? titleMatch[1] : 'IOUL'
    }
  };
}

export default function Home({ html, title }: { html: string; title: string }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}