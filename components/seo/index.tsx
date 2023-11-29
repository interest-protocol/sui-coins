import Head from 'next/head';
import { FC } from 'react';

import { SEOProps } from './seo.types';

const SEO: FC<SEOProps> = ({ pageTitle }) => {
  const title = `${pageTitle} | Movement`;

  return (
    <Head>
      <meta name="theme-color" content="#282828" />
      <meta charSet="utf-8" />
      <meta name="title" content={title} />
      <meta
        name="description"
        content="Generate custom coins and list all your tokens."
      />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="Movement" />
      <meta
        property="og:description"
        content="Generate custom coins and list all your tokens."
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
      <meta name="twitter:title" content="Movement" />
      <meta name="twitter:site" content="https://suicoins.com/" />
      <meta name="twitter:image" content="/ms-icon-310x310.png" />
      <meta
        name="twitter:description"
        content="Generate custom coins and list all your tokens."
      />
      <title>{title}</title>
    </Head>
  );
};

export default SEO;
