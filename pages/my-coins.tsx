import { NextPage } from 'next';
import dynamic from 'next/dynamic';

import { SEO } from '@/components';
import MyCoins from '@/views/my-coins';

const Web3Manager = dynamic(() => import('@/components/web3-manager'), {
  ssr: false,
});

const MyCoinsPage: NextPage = () => {
  return (
    <Web3Manager>
      <SEO pageTitle="My Coins" />
      <MyCoins />
    </Web3Manager>
  );
};

export default MyCoinsPage;
