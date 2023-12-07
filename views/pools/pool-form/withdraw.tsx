import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { SuiBlackSVG } from '@/svg';

import PoolField from './component/field';
import PoolReceiveSection from './component/receive-section';

const PoolWithDraw: FC = () => {
  return (
    <>
      <Typography
        size="large"
        variant="title"
        fontSize={['1.375rem', '1.375rem', '1.375rem', '2rem']}
      >
        I would like to Withdraw...
      </Typography>
      <Box display="flex" flexDirection="column" gap="1rem">
        <PoolField name="tokenLP" withoutIcon />
      </Box>
      <PoolReceiveSection
        items={[
          {
            symbol: 'SUI',
            balance: '0000',
            Icon: SuiBlackSVG,
          },
          {
            symbol: 'USDT',
            balance: '0.234',
            Icon: SuiBlackSVG,
          },
        ]}
      />
      <Button
        variant="filled"
        mt="1.5rem"
        width="max-content"
        mx="auto"
        py="0.625rem"
      >
        Remove Liquidity
      </Button>
    </>
  );
};

export default PoolWithDraw;
