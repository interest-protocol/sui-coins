import { NextPage } from 'next';

import { SEO } from '@/components';
import Pools from '@/views/faucet';

const PoolsPage: NextPage = () => (
  <>
    <SEO pageTitle="Pools" />
    <Pools />
  </>
);

export default PoolsPage;
