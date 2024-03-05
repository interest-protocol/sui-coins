import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import PoolField from './component/field';
import PoolReceiveSection from './component/receive-section';

const PoolDeposit: FC = () => {
  const { getValues } = useFormContext();

  const tokenList = getValues('tokenList');

  return (
    <>
      <Typography size="large" variant="title" fontSize="2xl">
        I would like to Deposit...
      </Typography>
      <Box display="flex" flexDirection="column" gap="m">
        {tokenList.map((_: any, index: number) => (
          <PoolField key={v4()} index={index} />
        ))}
      </Box>
      <PoolReceiveSection symbol="LPs Coin" balance={getValues('lpCoin')} />
      <Button variant="filled" mt="xl" width="max-content" mx="auto" py="s">
        Deposit
      </Button>
    </>
  );
};

export default PoolDeposit;
