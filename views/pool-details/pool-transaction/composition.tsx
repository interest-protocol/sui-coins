import { FC } from 'react';

import { BNBSVG } from '@/svg';

import PoolTransactionCardWrapper from './components/card-wrapper';
import CompositionItem from './components/composition-item';

const PoolTransactionComposition: FC = () => {
  return (
    <PoolTransactionCardWrapper title="pool composition">
      <CompositionItem Logo={BNBSVG} symbol="BNB" amount="5M" />
      <CompositionItem Logo={BNBSVG} symbol="BNB" amount="710 k" />
    </PoolTransactionCardWrapper>
  );
};

export default PoolTransactionComposition;
