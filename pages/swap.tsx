import { NextPage } from 'next';

import { SEO } from '@/components';
import Swap from '@/views/swap';

const SwapPage: NextPage = () => (
  <>
    <SEO pageTitle="Swap" />
    <Swap />
  </>
);

export default SwapPage;
