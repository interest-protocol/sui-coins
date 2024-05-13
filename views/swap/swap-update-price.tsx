import { QuoteSwapReturn } from '@interest-protocol/clamm-sdk';
import {
  CoinPath,
  PoolObjectIdPath,
} from '@interest-protocol/clamm-sdk/dist/clamm/router/router.types';
import { Box, Button, ProgressIndicator } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { normalizeStructTag } from '@mysten/sui.js/utils';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { useFormContext, useWatch } from 'react-hook-form';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';

import { TREASURY } from '@/constants';
import { EXCHANGE_FEE } from '@/constants/clamm';
import { useClammSdk } from '@/hooks/use-clamm-sdk';
import { FixedPointMath } from '@/lib';
import { RefreshSVG } from '@/svg';
import { parseBigNumberish } from '@/utils';

import { useAftermathRouter } from './swap.hooks';
import { SwapForm } from './swap.types';
import { isNativeRoute } from './swap.utils';

const countdownRenderer =
  (interval: string): CountdownRendererFn =>
  // eslint-disable-next-line react/display-name
  ({ completed, seconds }) => {
    if (completed) return <ProgressIndicator size={24} variant="loading" />;

    return (
      <ProgressIndicator
        size={24}
        noAnimation
        variant="circle"
        value={(seconds * 100) / Number(interval)}
      />
    );
  };

const SwapUpdatePrice: FC = () => {
  const clamm = useClammSdk();
  const { network } = useSuiClientContext();
  const aftermathRouter = useAftermathRouter();
  const { control, setValue, getValues } = useFormContext<SwapForm>();

  const native = getValues('native');

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

  const swapping = useWatch({
    control,
    name: 'swapping',
  });

  const interval = useWatch({
    control,
    name: 'settings.interval',
  });

  const lastFetchDate = useWatch({
    control,
    name: 'lastFetchDate',
  });

  const fetchingPrices = useWatch({
    control,
    name: 'fetchingPrices',
  });

  const resetFields = () => {
    setValue('route', null);
    setValue('to.display', '0');
    setValue('lastFetchDate', null);
    setValue('fetchingPrices', false);
    setValue('error', null);
  };

  const disabled = !coinInValue || coinInValue.isZero() || !coinOutType;

  const getRoutes = async () => {
    try {
      if (!native) {
        return await aftermathRouter.getCompleteTradeRouteGivenAmountIn({
          coinInType,
          coinOutType,
          coinInAmount: BigInt(
            coinInValue.decimalPlaces(0, BigNumber.ROUND_DOWN).toString()
          ),
          referrer: TREASURY,
          externalFee: {
            recipient: TREASURY,
            feePercentage: EXCHANGE_FEE,
          },
        });
      }

      return await clamm
        .getRoutesQuotes({
          coinIn: normalizeStructTag(coinInType),
          coinOut: normalizeStructTag(coinOutType),
          amount: BigInt(
            coinInValue.decimalPlaces(0, BigNumber.ROUND_DOWN).toString()
          ),
        })
        .then((value) => ({
          ...value,
          routes: value.routes.reduce(
            ([acc], route) => [
              acc && acc[2].amount >= route[2].amount ? acc : route,
            ],
            [] as [CoinPath, PoolObjectIdPath, QuoteSwapReturn][]
          ),
        }));
    } catch (e) {
      resetFields();
      setValue('error', 'There is no market for these coins.');
      throw e;
    } finally {
      setValue('fetchingPrices', false);
    }
  };

  const { mutate } = useSWR(
    `${coinInType}-${coinOutType}-${coinInValue?.toString()}-${network}`,
    async () => {
      if (disabled) {
        resetFields();
        return;
      }

      if (swapping) return;

      setValue('fetchingPrices', true);

      const data = await getRoutes();

      setValue('route', data);

      setValue(
        'to.display',
        isNativeRoute(data)
          ? String(
              FixedPointMath.toNumber(
                parseBigNumberish(data.routes[0][2].amount),
                getValues('to.decimals')
              )
            )
          : Number(
              (
                (FixedPointMath.toNumber(
                  coinInValue,
                  getValues('from.decimals')
                ) *
                  10 **
                    (getValues('from.decimals') - getValues('to.decimals'))) /
                data.spotPrice
              ).toFixed(6)
            ).toPrecision()
      );

      setValue('lastFetchDate', Date.now());
    },
    { refreshInterval: Number(interval) * 1000, refreshWhenOffline: false }
  );

  return (
    <Button
      isIcon
      bg="onPrimary"
      width="1.5rem"
      height="1.5rem"
      color="primary"
      variant="filled"
      alignItems="center"
      position="relative"
      disabled={disabled}
      nFocus={!disabled && { bg: 'lowContainer' }}
      nActive={!disabled && { bg: 'lowContainer' }}
      nHover={!disabled ? { bg: 'lowContainer' } : { bg: 'lowestContainer' }}
      nDisabled={
        disabled && {
          opacity: 1,
          color: 'outline',
          bg: 'lowestContainer',
          nHover: {
            bg: 'lowestContainer',
          },
        }
      }
      onClick={() => {
        Number(coinInValue) && mutate();
      }}
    >
      {fetchingPrices ? (
        <Box as="span" display="flex" position="absolute">
          <ProgressIndicator size={24} variant="loading" />
        </Box>
      ) : lastFetchDate ? (
        <Box as="span" display="flex" position="absolute">
          <Countdown
            date={lastFetchDate + Number(interval) * 1000}
            renderer={countdownRenderer(interval)}
          />
        </Box>
      ) : (
        <Box as="span" display="flex">
          <RefreshSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Box>
      )}
    </Button>
  );
};

export default SwapUpdatePrice;
