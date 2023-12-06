import { Button, Tag } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ClipboardSVG, DotSuccessSVG } from '@/svg';

import PoolTransactionCardWrapper from './components/card-wrapper';
import PoolTransactionLine from './components/line';

const PoolTransactionInformation: FC = () => {
  return (
    <PoolTransactionCardWrapper
      title="Pool Information"
      Suffix={
        <Tag PrefixIcon={DotSuccessSVG} variant="outline" size="small">
          Stable Pair
        </Tag>
      }
    >
      <PoolTransactionLine
        description="Pool Address"
        value="0xcf994611fd4c48e2"
        Suffix={
          <Button variant="text" isIcon>
            <ClipboardSVG width="100%" maxWidth="1.5rem" maxHeight="1.5rem" />
          </Button>
        }
      />
    </PoolTransactionCardWrapper>
  );
};

export default PoolTransactionInformation;
