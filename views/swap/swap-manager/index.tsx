import { Box, Typography } from '@interest-protocol/ui-kit';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';

import { TokenIcon } from '@/components';
import { TREASURY } from '@/constants';
import { COIN_TYPE_TO_SYMBOL, SUI_TYPE_ARG_LONG } from '@/constants/coins';
import { EXCHANGE_FEE } from '@/constants/dex';
import { useNetwork } from '@/context/network';
import { AftermathSVG, SwapArrowSVG } from '@/svg';
import { SwapForm } from '@/views/swap/swap.types';

import { useAftermathRouter } from './swap-manager.hooks';

const SwapManager: FC = () => {
  const network = useNetwork();
  const aftermathRouter = useAftermathRouter();
  const { control, setValue, getValues } = useFormContext<SwapForm>();

  const coinInType = useWatch({
    control,
    name: 'from.type',
  });

  const [coinInValue] = useDebounce(
    useWatch({
      control,
      name: 'from.value',
    }),
    800
  );

  const coinOutType = useWatch({
    control,
    name: 'to.type',
  });

  const interval = useWatch({
    control,
    name: 'settings.interval',
  });

  useSWR(
    `${coinInType}-${coinOutType}-${coinInValue}`,
    async () => {
      if (!(coinInType && coinOutType && Number(coinInValue))) {
        setValue('to.value', '0');
        setValue('swapPath', []);
        setValue('route', null);
        return;
      }
      toast.loading('Updating prices');

      const data = await aftermathRouter
        .getCompleteTradeRouteGivenAmountIn({
          coinInType,
          coinOutType,
          coinInAmount: BigInt(
            Math.floor(Number(coinInValue) * 10 ** getValues('from.decimals'))
          ),
          referrer: TREASURY,
          externalFee: {
            recipient: TREASURY,
            feePercentage: EXCHANGE_FEE,
          },
        })
        .catch((e) => {
          setValue('to.value', '0');
          setValue('swapPath', []);
          setValue('route', null);
          setValue('error', 'There is no market for these coins.');
          throw e;
        })
        .finally(() => {
          toast.dismiss();
        });

      setValue('route', data);

      setValue(
        'swapPath',
        data.routes.reduce((acc, curr) =>
          acc.spotPrice > curr.spotPrice ? curr : acc
        ).paths
      );

      console.log(getValues('to.decimals'));

      setValue(
        'to.value',
        Number(
          (
            (Number(coinInValue) / (data.spotPrice * 1000)) *
            10 ** getValues('to.decimals')
          ).toFixed(6)
        ).toPrecision()
      );
    },
    { refreshInterval: Number(interval) * 1000, refreshWhenOffline: false }
  );

  const swapPath = useWatch({ control, name: 'swapPath' });

  if (!swapPath?.length) return null;

  return (
    <Box
      p="l"
      mt="xs"
      gap="xl"
      mx="auto"
      width="100%"
      display="flex"
      color="onSurface"
      borderRadius="xs"
      alignItems="center"
      position="relative"
      bg="lowestContainer"
      justifyContent="center"
    >
      {swapPath?.map(({ coinIn, coinOut, protocolName }, index) => (
        <>
          {!index && (
            <TokenIcon
              network={network}
              type={
                coinIn.type === SUI_TYPE_ARG_LONG ? SUI_TYPE_ARG : coinIn.type
              }
              symbol={
                COIN_TYPE_TO_SYMBOL[network][
                  coinIn.type === SUI_TYPE_ARG_LONG ? SUI_TYPE_ARG : coinIn.type
                ]
              }
            />
          )}
          <Box>
            <Typography variant="label" size="small">
              {protocolName}
            </Typography>
            <SwapArrowSVG width="100%" maxWidth="5rem" maxHeight="0.75rem" />
          </Box>
          <TokenIcon
            network={network}
            type={
              coinOut.type === SUI_TYPE_ARG_LONG ? SUI_TYPE_ARG : coinOut.type
            }
            symbol={
              COIN_TYPE_TO_SYMBOL[network][
                coinOut.type === SUI_TYPE_ARG_LONG ? SUI_TYPE_ARG : coinOut.type
              ]
            }
          />
        </>
      ))}
      <a
        target="_blank"
        rel="noopener, noreferrer"
        href="https://aftermath.finance"
      >
        <Box
          gap="2xs"
          display="flex"
          right="0.75rem"
          bottom="0.25rem"
          position="absolute"
          alignItems="flex-end"
        >
          <Typography variant="body" size="small">
            Powered by
          </Typography>
          <AftermathSVG width="100%" maxWidth="1.2rem" maxHeight="1.2rem" />
        </Box>
      </a>
    </Box>
  );
};

export default SwapManager;
