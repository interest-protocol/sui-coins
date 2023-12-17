import { FC } from 'react';

import Layout from '@/components/layout';

import { PoolDetailsProps } from './pool-details.types';
import PoolForm from './pool-form';
import PoolTransaction from './pool-transaction';

const PoolDetails: FC<PoolDetailsProps> = ({ objectId }) => {
  console.log('>> objectId :: ', objectId);

  return (
    <Layout>
      <PoolForm />
      <PoolTransaction />
    </Layout>
  );
};

export default PoolDetails;
