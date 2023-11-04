import Head from 'next/head';
import { FC } from 'react';

const SEO: FC<{ pageTitle: string }> = ({ pageTitle }) => {
  const title = `${pageTitle} | Sui Mint`;

  return (
    <Head>
      <meta name="theme-color" content="#282828" />
      <meta charSet="utf-8" />
      <meta name="title" content={title} />
      <meta
        name="description"
        content="Learn to build on 10+ blockchains in a supportive community of 130K+ future blockchain developers. Try our courses and expand your web3 stack today."
      />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="Sui Mint" />
      <meta
        property="og:description"
        content="Learn to build on 10+ blockchains in a supportive community of 130K+ future blockchain developers. Try our courses and expand your web3 stack today."
      />
      <meta
        property="og:image"
        content="https://metaschool.so/assets/landing-page.webp"
      />
      <meta
        property="og:image:secure_url"
        content="/android-chrome-256x256.png"
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="256" />
      <meta property="og:image:height" content="256" />
      <meta property="og:image:alt" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Interest Protocol" />
      <meta name="twitter:site" content="https://metaschool.so/" />
      <meta
        name="twitter:image"
        content="https://metaschool.so/assets/landing-page.webp"
      />
      <meta
        name="twitter:description"
        content="Learn to build on 10+ blockchains in a supportive community of 130K+ future blockchain developers. Try our courses and expand your web3 stack today."
      />
      <title>{title}</title>
    </Head>
  );
};

export default SEO;
