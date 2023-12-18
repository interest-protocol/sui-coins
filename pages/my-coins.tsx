import { NextPage } from 'next';

import { SEO } from '@/components';
import MyCoins from '@/views/my-coins';

const MyCoinsPage: NextPage = () => (
  <>
    <SEO pageTitle="My Coins" />
    <MyCoins />
  </>
);

export default MyCoinsPage;
