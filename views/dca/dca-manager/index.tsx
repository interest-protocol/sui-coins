import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';

import { TREASURY } from '@/constants';
import { EXCHANGE_FEE } from '@/constants/dex';

import { DCAForm } from '../dca.types';
import { useAftermathRouter } from './dca-manager.hooks';

const SwapManager: FC = () => {
  const aftermathRouter = useAftermathRouter();
  const { control, setValue, getValues } = useFormContext<DCAForm>();

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

  useSWR(`${coinInType}-${coinOutType}-${coinInValue}`, async () => {
    if (!(coinInType && coinOutType && Number(coinInValue))) {
      setValue('to.value', '0');
      setValue('route', null);
      return;
    }

    toast.loading('Finding market');

    const data = await aftermathRouter
      .getCompleteTradeRouteGivenAmountIn({
        coinInType,
        coinOutType,
        coinInAmount: BigInt(
          Math.floor(+coinInValue * 10 ** getValues('from.decimals'))
        ),
        referrer: TREASURY,
        externalFee: {
          recipient: TREASURY,
          feePercentage: EXCHANGE_FEE,
        },
      })
      .catch((e) => {
        setValue('to.value', '0');
        setValue('route', null);
        setValue('error', 'There is no market for these coins.');
        throw e;
      })
      .finally(() => {
        toast.dismiss();
      });

    setValue('route', data);

    setValue(
      'to.value',
      Number(
        (
          (+coinInValue *
            10 ** (getValues('from.decimals') - getValues('to.decimals'))) /
          data.spotPrice
        ).toFixed(6)
      ).toPrecision()
    );
  });

  return null;
};

export default SwapManager;
