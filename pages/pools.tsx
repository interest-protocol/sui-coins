import { NextPage } from 'next';

import { SEO } from '@/components';
import Pool from '@/views/pool';

const Pools: NextPage = () => (
  <>
    <SEO pageTitle="Pools" />
    <Pool />
  </>
);

export default Pools;
