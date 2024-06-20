import { Box, Typography } from '@interest-protocol/ui-kit';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import BigNumber from 'bignumber.js';
import { values } from 'ramda';
import { FC } from 'react';
import useSWR from 'swr';

import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';
import slippage from '@/views/swap/manage-slippage/slippage';

import { useDeposit } from '../pool-form-deposit/pool-form-deposit.hooks';
import { useWithdraw } from '../pool-form-withdraw/pool-form-withdraw.hooks';
import LpCoinField from './fields/lp-coin';
import TokenListFields from './fields/token-list';
import { PoolPreviewProps } from './preview.types';
import PoolPreviewWrapper from './wrapper';

const PoolPreview: FC<PoolPreviewProps> = ({
  onSubmit,
  getValues,
  isDeposit,
}) => {
  const client = useSuiClient();
  const currentAccount = useCurrentAccount();
  const action = (isDeposit ? useDeposit : useWithdraw)();

  const fees = useSWR(
    `network-fee-${currentAccount?.address}-${slippage}-${isDeposit}`,
    async () => {
      if (!currentAccount) return;

      const tx = await action(getValues());

      const inspect = await client.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: currentAccount.address,
      });

      const { storageRebate, ...gasStructure } = inspect.effects.gasUsed;

      return [
        FixedPointMath.toNumber(
          values(gasStructure).reduce(
            (acc, value) => acc.plus(BigNumber(value)),
            ZERO_BIG_NUMBER
          )
        ),
        FixedPointMath.toNumber(BigNumber(storageRebate)),
      ];
    }
  );

  return (
    <PoolPreviewWrapper
      fees={fees}
      onSubmit={onSubmit}
      isDeposit={isDeposit}
      getValues={getValues}
    >
      <Box display="flex" flexDirection="column" gap="2xl">
        <Box display="flex" flexDirection="column" gap="xs">
          <Typography variant="label" size="small" textTransform="uppercase">
            {`You will ${isDeposit ? 'deposit' : 'withdraw'}`}
          </Typography>
          {isDeposit ? (
            <TokenListFields getValues={getValues} />
          ) : (
            <LpCoinField getValues={getValues} />
          )}
        </Box>
        <Box display="flex" flexDirection="column" gap="xs">
          <Typography variant="label" size="small" textTransform="uppercase">
            You will receive (estimated):
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
};
export default PoolPreview;
