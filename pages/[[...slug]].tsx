import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';

interface Props {
  html: string;
  title: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const htmlDir = path.join(process.cwd(), 'public');
  const paths: { params: { slug: string[] } }[] = [];

  function walk(dir: string, rel: string[] = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full, [...rel, entry.name]);
      } else if (entry.name === 'index.html') {
        // ignore root index to avoid duplicate at /
        if (rel.length) {
          paths.push({ params: { slug: rel } });
        }
      }
    }
  }
  walk(htmlDir);
  return { paths, fallback: false };
};

function extractBody(html: string): { body: string; title: string } {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  return {
    body: bodyMatch ? bodyMatch[1] : html,
    title: titleMatch ? titleMatch[1] : 'IOUL'
  };
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = (params?.slug as string[]) ?? [];
  const filePath = path.join(process.cwd(), 'public', ...slug, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  const { body, title } = extractBody(html);
  return { props: { html: body, title } };
};

export default function StaticHtmlPage({ html, title }: Props) {
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