import { ProgressIndicator } from '@interest-protocol/ui-kit';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import BigNumber from 'bignumber.js';
import { values } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import useSWR from 'swr';

import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';

import {
  useCreateStablePool,
  useCreateVolatilePool,
} from '../pool-create.hooks';
import { CreatePoolForm, Token } from '../pool-create.types';

const PoolSummaryFee: FC = () => {
  const client = useSuiClient();
  const currentAccount = useCurrentAccount();
  const createStablePool = useCreateStablePool();
  const createVolatilePool = useCreateVolatilePool();
  const { control } = useFormContext<CreatePoolForm>();

  const form = useWatch({ control });

  const { data: fees, isLoading } = useSWR(
    `network-fee-${currentAccount?.address}-${form}`,
    async () => {
      if (!currentAccount) return;

      if (!form || !form.tokens?.length) throw new Error('No data');

      const txb = await (form.isStable ? createStablePool : createVolatilePool)(
        form.tokens as ReadonlyArray<Token>
      );

      const inspect = await client.devInspectTransactionBlock({
        transactionBlock: txb,
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

  if (isLoading) return <ProgressIndicator size={16} variant="loading" />;

  if (!fees) return '--';

  return <>{fees[0]} Sui</>;
};

export default PoolSummaryFee;
