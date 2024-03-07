import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { PoolToken } from '@/views/pools/pools.types';
import ManageSlippage from '@/views/swap/manage-slippage';

import PoolField from '../component/field';
import { PoolFormProps } from '../component/field/field.types';
import Selection from './selection';

const PoolWithdraw: FC<PoolFormProps> = ({ poolOptionView }) => {
  const { getValues } = useFormContext();

  const lpCoin = getValues('lpCoin') as PoolToken;

  return (
    <>
      <Typography size="large" variant="title" fontSize="2xl">
        I would like to Withdraw...
      </Typography>
      <Box display="flex" flexDirection="column" gap="m">
        {[lpCoin].map((_: any, index: number) => (
          <PoolField key={v4()} index={index} poolOptionView={poolOptionView} />
        ))}
        <Selection />
      </Box>
      <Box>
        <Typography variant="body" size="large" mb="m">
          Manage your slippage
        </Typography>
        <Box bg="container" borderRadius="xs">
          <ManageSlippage shortButton />
        </Box>
      </Box>
      <Button variant="filled" mt="xl" width="max-content" mx="auto" py="s">
        Remove Liquidity
      </Button>
    </>
  );
};

export default PoolWithdraw;
