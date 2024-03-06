import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import PoolCardTrade from '@/views/pools/pool-card/pool-card-trade';

import { LINES } from '../preview.data';
import { PoolPreviewWrapperProps } from '../preview.types';

const PoolPreviewWrapperFooter: FC<PoolPreviewWrapperProps> = ({
  isDeposit,
  onSubmit,
}) => (
  <Box>
    <Box px="m" py="xs" bg="surface" borderRadius="1rem">
      {LINES.map((line, index) => (
        <PoolCardTrade {...line} index={index} key={v4()} isInfo />
      ))}
    </Box>
    <Button variant="filled" my="xl" width="fill-available" onClick={onSubmit}>
      <Typography variant="label" size="large" textAlign="center" width="100%">
        {`Confirm ${isDeposit ? 'Deposit' : 'Withdraw'}`}
      </Typography>
    </Button>
  </Box>
);

export default PoolPreviewWrapperFooter;
