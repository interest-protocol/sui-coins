import { FC } from 'react';

import Layout from '@/components/layout';

import PoolForm from './pool-form';
import PoolTransaction from './pool-transaction';

const PoolDetails: FC = () => (
  <Layout>
    <PoolForm />
    <PoolTransaction />
  </Layout>
);

export default PoolDetails;
