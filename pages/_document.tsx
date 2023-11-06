import { Head, Html, Main, NextScript } from 'next/document';
import { ReactNode } from 'react';

const Document = (): ReactNode => (
  <Html lang="en">
    <Head />
    <body id="body">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
