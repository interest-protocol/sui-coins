import { Head, Html, Main, NextScript } from 'next/document';
import { ReactNode } from 'react';

const Document = (): ReactNode => (
  <Html lang="en">
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
    <body id="body">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
