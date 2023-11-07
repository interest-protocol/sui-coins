import 'react-loading-skeleton/dist/skeleton.css';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import NextProgress from 'next-progress';
import { ReactNode, StrictMode } from 'react';

import { ThemeManager } from '@/components';

const Provider = dynamic(() => import('@/components/sui-client-provider'), {
  ssr: false,
});

const MyApp = ({ Component, pageProps }: AppProps<NextPage>): ReactNode => (
  <>
    <Head>
      <title>Sui Coins</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
      />
    </Head>
    <NextProgress options={{ showSpinner: false }} />
    <Provider>
      <ThemeManager>
        <StrictMode>
          <Component {...pageProps} />
          <VercelAnalytics />
        </StrictMode>
      </ThemeManager>
    </Provider>
  </>
);

export default MyApp;
