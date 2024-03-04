import { NextPage } from 'next';

import { SEO } from '@/components';
import Pool from '@/views/pools';

const PoolsPage: NextPage = () => (
  <>
    <SEO pageTitle="Pools" />
    <Pool />
  </>
);

export default PoolsPage;
