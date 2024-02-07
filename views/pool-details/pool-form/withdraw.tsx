import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { BNBSVG } from '@/svg';

import PoolField from './component/field';
import PoolReceiveSection from './component/receive-section';

const PoolWithDraw: FC = () => {
  return (
    <>
      <Typography
        size="large"
        variant="title"
        fontSize={['2xl', '2xl', '2xl', '5xl']}
      >
        I would like to Withdraw...
      </Typography>
      <Box display="flex" flexDirection="column" gap="m">
        <PoolField name="tokenLP" withoutIcon />
      </Box>
      <PoolReceiveSection
        items={[
          {
            symbol: 'SUI',
            balance: '0000',
            Icon: BNBSVG,
          },
          {
            symbol: 'USDT',
            balance: '0.234',
            Icon: BNBSVG,
          },
        ]}
      />
      <Button
        py="s"
        mt="xl"
        mx="auto"
        variant="filled"
        borderRadius="xs"
        width="max-content"
      >
        Remove Liquidity
      </Button>
    </>
  );
};

export default PoolWithDraw;
