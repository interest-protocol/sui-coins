import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import ManageSlippage from '@/views/swap/manage-slippage';

import PoolField from '../pool-field';
import { PoolFormProps } from '../pool-field/pool-field.types';
import Selection from './pool-form-amm-withdraw-receive';
import PoolFormWithdrawButton from './pool-form-withdraw-button';
import WithdrawManager from './pool-form-withdraw-manager';

const PoolFormWithdraw: FC<PoolFormProps> = ({ poolOptionView }) => (
  <>
    <Typography size="large" variant="title" fontSize="2xl">
      I would like to Withdraw...
    </Typography>
    <Box display="flex" flexDirection="column" gap="m">
      <PoolField index={0} poolOptionView={poolOptionView} />
      <Selection />
    </Box>
    <Box>
      <Typography variant="body" size="large" mb="m">
        Manage your slippage
      </Typography>
      <Box bg="lowestContainer" borderRadius="xs">
        <ManageSlippage />
      </Box>
    </Box>
    <WithdrawManager />
    <PoolFormWithdrawButton />
  </>
);

export default PoolFormWithdraw;
