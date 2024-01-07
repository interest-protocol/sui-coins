import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import PoolField from './component/field';
import PoolReceiveSection from './component/receive-section';

const PoolDeposit: FC = () => {
  return (
    <>
      <Typography
        size="large"
        variant="title"
        fontSize={['1.375rem', '1.375rem', '1.375rem', '2rem']}
      >
        I would like to Deposit...
      </Typography>
      <Box display="flex" flexDirection="column" gap="1rem">
        <PoolField name="firstToken" />
        <PoolField name="secondToken" />
      </Box>
      <PoolReceiveSection
        items={[
          {
            symbol: 'LPs Coin',
            balance: '0000',
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
        Deposit
      </Button>
    </>
  );
};

export default PoolDeposit;
