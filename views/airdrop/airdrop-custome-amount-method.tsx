import { Box, TextField, Typography } from '@interest-protocol/ui-kit';
import TextareaField from 'elements/textearea-field';
import { useFormContext, useWatch } from 'react-hook-form';

import { Network, TOKEN_ICONS } from '@/constants';
import { useNetwork } from '@/context/network';
import { DefaultSVG } from '@/svg';

import { IAirdropForm, IToken } from './airdrop.types';

export const renderCoinIcon = (token: IToken, network: Network) => {
  if (!token) return null;
  const TokenIcon =
    TOKEN_ICONS[network][
      (network === Network.MAINNET ? token.type : token.symbol) as string
    ] ?? DefaultSVG;
  return <TokenIcon maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />;
};

const AirdropCustomeAmountMethod = () => {
  const { control } = useFormContext<IAirdropForm>();
  const { network } = useNetwork();

  const token = useWatch({ control, name: 'token' });

  return (
    <Box>
      <Box pb="m">
        <Typography variant="body" size="small">
          Enter Amount to Send
        </Typography>
        <Box
          my="xs"
          gap="2xs"
          minWidth="8rem"
          cursor="pointer"
          borderRadius="xs"
          border="1px solid"
          alignItems="center"
          borderColor="outlineVariant"
        >
          <Box display="flex" alignItems="center" width="100%">
            <Box
              height="2.5rem"
              width="2.5rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                bg="#6FBCF0"
                display="flex"
                width="1.5rem"
                p="0.5rem"
                minWidth="1.5rem"
                minHeight="1.5rem"
                height="1.5rem"
                borderRadius="50%"
                alignItems="center"
                color="lowestContainer"
                justifyContent="center"
              >
                {renderCoinIcon(token, network)}
              </Box>
            </Box>
            <TextField
              type="number"
              placeholder="000"
              fieldProps={{
                flex: 1,
                border: 'none',
                borderRadius: '0.5rem',
              }}
            />
          </Box>
        </Box>
      </Box>
      <TextareaField
        fieldProps={{
          borderColor: 'outlineVariant',
        }}
        label="Enter Separate wallet addresses on a new line"
      />
    </Box>
  );
};

export default AirdropCustomeAmountMethod;
