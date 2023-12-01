import { NextPage } from 'next';

import { SEO } from '@/components';
import Pools from '@/views/faucet';

const PoolsPage: NextPage = () => (
  <>
    <SEO pageTitle="Faucet" />
    <Pools />
  </>
);

export default PoolsPage;
