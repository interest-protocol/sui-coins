import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import ManageSlippage from '@/views/swap/manage-slippage';

import PoolField from './component/field';
import { PoolFormProps } from './component/field/field.types';
import PoolReceiveSection from './component/receive-section';

const PoolDeposit: FC<PoolFormProps> = ({ poolOptionView }) => {
  const { getValues } = useFormContext();

  const tokenList = getValues('tokenList');

  return (
    <>
      <Typography size="large" variant="title" fontSize="2xl">
        I would like to Deposit...
      </Typography>
      <Box display="flex" flexDirection="column" gap="m">
        {tokenList.map((_: any, index: number) => (
          <PoolField key={v4()} index={index} poolOptionView={poolOptionView} />
        ))}
      </Box>
      <PoolReceiveSection symbol="LPs Coin" balance={getValues('lpCoin')} />
      <Box>
        <Typography variant="body" size="large" mb="m">
          Manage your slippage
        </Typography>
        <Box bg="container" borderRadius="xs">
          <ManageSlippage shortButton />
        </Box>
      </Box>

      <Button variant="filled" mt="xl" width="max-content" mx="auto" py="s">
        Deposit
      </Button>
    </>
  );
};

export default PoolDeposit;
