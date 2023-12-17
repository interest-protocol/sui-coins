import { NextPage } from 'next';

import { SEO } from '@/components';
import PoolDetails from '@/views/pool-details';

const PoolsPage: NextPage = () => (
  <>
    <SEO pageTitle="Pools" />
    <PoolDetails />
  </>
);

export default PoolsPage;
