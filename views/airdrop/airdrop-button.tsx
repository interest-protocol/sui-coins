import { Box, Button } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';

import { IAirdropForm } from './airdrop.types';

const AirdropButton: FC<{ onSend: () => void }> = ({ onSend }) => {
  const { control } = useFormContext<IAirdropForm>();

  const { airdropList, token } = useWatch({ control });

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
