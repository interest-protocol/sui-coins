import { Box, Button } from '@interest-protocol/ui-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useWalletKit } from '@mysten/wallet-kit';
import BigNumber from 'bignumber.js';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useNetwork } from '@/context/network';
import { useSuiClient } from '@/hooks/use-sui-client';
import { FixedPointMath } from '@/lib';
import { splitArray } from '@/utils';

import { IAirdropForm } from './airdrop.types';

const RATE_LIMIT_DELAY = 1000;

const BATCH_SIZE = 500;

const AirdropButton: FC<{ onSend: () => void }> = ({ onSend }) => {
  const { control, getValues } = useFormContext<IAirdropForm>();
  const [progress, setProgress] = useState(0);

  const { airdropList, token } = useWatch({ control });
  const { network } = useNetwork();
  const suiClient = useSuiClient(network);
  const { signTransactionBlock } = useWalletKit();
  const isDisabled =
    !airdropList ||
    !token?.balance ||
    token.balance <
      FixedPointMath.toNumber(
        airdropList?.reduce(
          (acc, { amount }) => acc.plus(BigNumber(amount ?? 0)),
          BigNumber(0)
        ),
        token.decimals
      );

  const handleSend = async () => {
    onSend();

    try {
      const { airdropList, token } = getValues();

      if (!airdropList) return;

      const list = splitArray(airdropList, BATCH_SIZE);

      for (const batch of list) {
        const txb = new TransactionBlock();
      }
    } catch {
    } finally {
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Button disabled={isDisabled} variant="filled" onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
};

export default AirdropButton;
