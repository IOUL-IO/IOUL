import { NextPage } from 'next';

const Page: NextPage = () => (
  <iframe
    src="/ioul/index.html"
    style={ width: '100%', height: '100vh', border: 'none' }
    title="ioul/index.html"
  />
);

export default Page;
