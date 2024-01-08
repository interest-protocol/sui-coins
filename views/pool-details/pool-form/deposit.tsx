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
        fontSize={['2xl', '2xl', '2xl', '5xl']}
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
        py="s"
        mt="3xl"
        mx="auto"
        variant="filled"
        borderRadius="xs"
        width="max-content"
      >
        Deposit
      </Button>
    </>
  );
};

export default PoolDeposit;
