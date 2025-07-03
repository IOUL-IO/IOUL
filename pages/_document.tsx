import Document, { Html, Head, Main, NextScript } from 'next/document';

const legacyCssFiles = [
  '/IOUL-login/styles.css',
  '/IOUL-login/center/add-ons/styles.css',
  '/IOUL-login/center/community/styles.css',
  '/IOUL-login/center/ioul center/styles.css',
  '/IOUL-login/center/library/styles.css',
  '/IOUL-login/ioul/styles.css',
  '/IOUL-login/tool-kit/cms/styles.css',
  '/IOUL-login/tool-kit/cms/docs/styles.css',
  '/IOUL-login/tool-kit/cms/forms/styles.css',
  '/IOUL-login/tool-kit/cms/sheets/styles.css',
  '/IOUL-login/tool-kit/coms/styles.css',
  '/IOUL-login/tool-kit/crm/styles.css',
  '/IOUL-login/tool-kit/erp/styles.css',
  '/IOUL-login/tool-kit/fms/styles.css',
  '/IOUL-login/tool-kit/hr/styles.css',
  '/IOUL-login/tool-kit/it/styles.css',
  '/IOUL-login/tool-kit/jobs/styles.css',
  '/IOUL-login/tool-kit/lms/styles.css',
  '/IOUL-login/tool-kit/ops/styles.css'
];

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {legacyCssFiles.map((href) => (
            <link key={href} rel="stylesheet" href={href} />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}