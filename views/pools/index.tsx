import { FC } from 'react';

import Layout from '@/components/layout';
import { BNBSVG } from '@/svg';

import PoolTitleBar from './pool-title-bar';

const Pools: FC = () => {
  const onBack = () => {
    console.log('>>>>>>On Back');
  };
  return (
    <Layout>
      <PoolTitleBar
        onBack={onBack}
        name="Pool Name"
        iconTokenList={[BNBSVG, BNBSVG]}
      />
    </Layout>
  );
};

export default Pools;
