import { Box, Button, Tag } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ClipboardSVG, DotSuccessSVG } from '@/svg';

import PoolTransactionCardWrapper from './components/card-wrapper';
import PoolTransactionLine from './components/line';

const PoolTransactionInformation: FC = () => {
  return (
    <PoolTransactionCardWrapper
      title="Pool Information"
      Suffix={
        <Tag
          PrefixIcon={
            <Box
              p=".1875rem"
              width="1.3rem"
              height="1.3rem"
              display="flex"
              color="onSurface"
              alignItems="center"
              borderRadius="full"
              justifyContent="center"
            >
              <DotSuccessSVG
                width="100%"
                maxWidth="1.125rem"
                maxHeight="1.125rem"
              />
            </Box>
          }
          variant="outline"
          size="small"
        >
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
