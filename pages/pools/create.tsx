import { NextPage } from 'next';

import { SEO } from '@/components';
import PoolCreate from '@/views/pool-create';

const PoolCreatePage: NextPage = () => {
  return (
    <>
      <SEO pageTitle="Pool Create" />
      <PoolCreate />
    </>
  );
};

export default PoolCreatePage;
