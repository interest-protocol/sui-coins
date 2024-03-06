import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { noop } from '@/utils';

import LpCoinField from './fields/lp-coin';
import TokenListFields from './fields/token-list';
import { PoolPreviewProps } from './preview.types';
import PoolPreviewWrapper from './wrapper';

const PoolPreview: FC<PoolPreviewProps> = ({ getValues, isDeposit }) => (
  <PoolPreviewWrapper isDeposit={isDeposit} onSubmit={noop}>
    <Box display="flex" flexDirection="column" gap="2xl">
      <Box display="flex" flexDirection="column" gap="xs">
        <Typography variant="label" size="small" textTransform="uppercase">
          {`You will ${isDeposit ? 'Deposit' : 'Withdraw'}`}
        </Typography>
        {isDeposit ? (
          <TokenListFields getValues={getValues} />
        ) : (
          <LpCoinField getValues={getValues} />
        )}
      </Box>
      <Box display="flex" flexDirection="column" gap="xs">
        <Typography variant="label" size="small" textTransform="uppercase">
          you will receive (estimetad):
        </Typography>
        {!isDeposit ? (
          <TokenListFields getValues={getValues} />
        ) : (
          <LpCoinField getValues={getValues} />
        )}
      </Box>
    </Box>
  </PoolPreviewWrapper>
);

export default PoolPreview;
