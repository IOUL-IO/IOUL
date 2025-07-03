import { NextPage } from 'next';

const Page: NextPage = () => (
  <iframe
    src="/index.html"
    style={ width: '100%', height: '100vh', border: 'none' }
    title="index.html"
  />
);

export default Page;
