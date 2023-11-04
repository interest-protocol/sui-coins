import { Head, Html, Main, NextScript } from 'next/document';
import { ReactNode } from 'react';

const Document = (): ReactNode => (
  <Html lang="en">
    <Head>
      <link rel="stylesheet" href="../styles/css/satoshi.css" />
      <link rel="stylesheet" href="../styles/css/proto.css" />
    </Head>
    <body id="body">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
