import { Box, Typography } from '@interest-protocol/ui-kit';
import { SUI_TYPE_ARG } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { AIRDROP_SUI_FEE_PER_ADDRESS } from '@/constants/fees';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';
import { BATCH_SIZE } from '@/views/airdrop/airdrop.constants';

import { AirdropSummaryProps, IAirdropForm } from '../../airdrop.types';

const METHOD_TITLE = {
  csv: 'CSV',
  nft: 'NFT',
  suiPlay: 'SuiPlay Soulbound',
  addressList: 'List of addresses',
};

const feeFree = JSON.parse(process.env.NEXT_PUBLIC_FEE_FREE ?? 'false');

const AirdropSummary: FC<AirdropSummaryProps> = ({ method }) => {
  const { query } = useRouter();
  const { coinsMap } = useWeb3();
  const { control } = useFormContext<IAirdropForm>();

  const airdropList = useWatch({ control, name: 'airdropList' });

  const airdropFee =
    !airdropList || (feeFree && query['discount'] === 'free')
      ? ZERO_BIG_NUMBER
      : BigNumber(
          AIRDROP_SUI_FEE_PER_ADDRESS * (method === 'suiPlay' ? 0.5 : 1)
        ).times(airdropList.length);

  return (
    <Box display="flex" flexDirection="column" mb="m">
      <Box bg="container" px="m" py="2xs" borderRadius="xs">
        <Box
          py="m"
          display="flex"
          borderBottom="1px solid"
          borderColor="outlineVariant"
          justifyContent="space-between"
        >
          <Typography
            size="medium"
            variant="body"
            opacity="0.80"
            color="#000000A3"
          >
            Delivery method
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              variant="body"
              size="medium"
              color="onSurface"
              mr="0.5rem"
            >
              {method ? METHOD_TITLE[method] : '--'}
            </Typography>
          </Box>
        </Box>
        <Box
          py="m"
          display="flex"
          borderBottom="1px solid"
          borderColor="outlineVariant"
          justifyContent="space-between"
        >
          <Typography
            variant="body"
            size="medium"
            opacity="0.80"
            color="#000000A3"
          >
            Total addresses
          </Typography>

          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              variant="body"
              size="medium"
              color="onSurface"
              mr="0.5rem"
            >
              {airdropList ? airdropList.length : '--'}
            </Typography>
          </Box>
        </Box>
        <Box py="m" display="flex" justifyContent="space-between">
          <Typography
            variant="body"
            size="medium"
            opacity="0.80"
            color="#000000A3"
          >
            Sent in batches of
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              variant="body"
              size="medium"
              color="onSurface"
              mr="0.5rem"
            >
              {airdropList ? Math.ceil(airdropList.length / BATCH_SIZE) : '--'}
            </Typography>
          </Box>
        </Box>
        <Box
          py="m"
          display="flex"
          alignItems="center"
          borderTop="1px solid"
          borderColor="outlineVariant"
          justifyContent="space-between"
        >
          <Typography
            variant="body"
            size="medium"
            opacity="0.80"
            color="#000000A3"
          >
            Total SUI fee
          </Typography>
          <Box textAlign="right">
            <Typography
              size="medium"
              variant="body"
              color={
                airdropFee.gt(
                  coinsMap[SUI_TYPE_ARG]?.balance || ZERO_BIG_NUMBER
                )
                  ? 'error'
                  : 'unset'
              }
            >
              {FixedPointMath.toNumber(airdropFee)}
            </Typography>
            {airdropFee.gt(
              coinsMap[SUI_TYPE_ARG]?.balance ?? ZERO_BIG_NUMBER
            ) && (
              <Typography size="small" variant="body" color="error">
                Not enough SUI
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AirdropSummary;
