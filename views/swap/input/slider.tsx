import { Box } from '@interest-protocol/ui-kit';
import { SUI_TYPE_ARG } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';

import { SwapForm } from '../swap.types';

const Slider = dynamic(
  import('@interest-protocol/ui-kit').then(({ Slider }) => Slider),
  { ssr: false }
);

const SwapFormFieldSlider: FC = () => {
  const { coinsMap } = useWeb3();
  const { control, setValue, getValues } = useFormContext<SwapForm>();

  useWatch({ control, name: 'updateSlider' });
  const type = useWatch({ control, name: 'from.type' });
  const swapping = useWatch({ control, name: 'swapping' });

  const safeRemoval =
    type === SUI_TYPE_ARG
      ? FixedPointMath.toBigNumber(1, getValues('from.decimals'))
      : ZERO_BIG_NUMBER;

  const balance = coinsMap[type]
    ? coinsMap[type].balance.minus(safeRemoval)
    : ZERO_BIG_NUMBER;

  const fromValue = getValues('from.value') ?? ZERO_BIG_NUMBER;

  const initial =
    fromValue && balance && !fromValue.isZero?.() && !balance.isZero?.()
      ? balance.gt(fromValue)
        ? +FixedPointMath.toNumber(
            fromValue.times(100).div(balance),
            0
          ).toFixed(0)
        : 100
      : 0;

  return (
    <Box mx="s">
      <Slider
        min={0}
        max={100}
        initial={initial}
        disabled={!balance || balance.isZero?.() || swapping}
        onChange={(value: number) => {
          setValue(
            'from.display',
            Number(
              (
                FixedPointMath.toNumber(balance, getValues('from.decimals')) *
                (value / 100)
              ).toFixed(6)
            ).toPrecision()
          );
          setValue(
            'from.value',
            balance.times(BigNumber(value)).div(BigNumber(100))
          );
          if (getValues('focus')) setValue('focus', false);
        }}
      />
    </Box>
  );
};

export default SwapFormFieldSlider;
