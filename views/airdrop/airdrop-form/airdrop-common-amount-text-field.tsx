import { Box, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';
import { useNetwork } from '@/context/network';
import { parseInputEventToNumberString } from '@/utils';

import { IAirdropForm } from '../airdrop.types';

const AirdropCustomAmountTextField: FC = () => {
  const { network } = useNetwork();
  const { register, setValue, control } = useFormContext<IAirdropForm>();

  const { type, symbol } = useWatch({ control, name: 'token' });

  return (
    <TextField
      placeholder="0"
      {...register('commonAmount', {
        onChange: (v: ChangeEvent<HTMLInputElement>) => {
          setValue('commonAmount', parseInputEventToNumberString(v));
        },
      })}
      fieldProps={{
        mt: 's',
        flex: 1,
        borderRadius: 'xs',
      }}
      Prefix={
        <Box
          bg="black"
          color="white"
          display="flex"
          width="1.5rem"
          height="1.5rem"
          minWidth="1.5rem"
          minHeight="1.5rem"
          borderRadius="full"
          alignItems="center"
          justifyContent="center"
        >
          <TokenIcon
            network={network}
            maxWidth="1.25rem"
            maxHeight="1.25rem"
            tokenId={network === Network.MAINNET ? type : symbol}
          />
        </Box>
      }
    />
  );
};

export default AirdropCustomAmountTextField;
