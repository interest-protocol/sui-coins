import { NextPage } from 'next';

import { SEO } from '@/components';
import PoolDetails from '@/views/pools/pool-details';

const PoolDetailsPage: NextPage = () => (
  <>
    <SEO pageTitle="Pools" />
    <PoolDetails />
  </>
);

export default PoolDetailsPage;
