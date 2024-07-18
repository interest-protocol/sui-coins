import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { isSui, ZERO_BIG_NUMBER } from '@/utils';

import { SwapForm } from '../../swap.types';

const Slider = dynamic(
  import('@interest-protocol/ui-kit').then(({ Slider }) => Slider),
  { ssr: false }
);

const SwapFormFieldSlider: FC = () => {
  const { coinsMap } = useWeb3();
  const { control, setValue, getValues } = useFormContext<SwapForm>();

  const type = useWatch({ control, name: 'from.type' });
  const swapping = useWatch({ control, name: 'swapping' });

  const safeRemoval = isSui(type) ? BigNumber(100000000) : ZERO_BIG_NUMBER;

  const balance = coinsMap[type]
    ? coinsMap[type].balance.minus(safeRemoval)
    : ZERO_BIG_NUMBER;

  const fromValue = type ? getValues('from.value') : '0';

  const initial =
    fromValue && balance && Number(fromValue) && !balance.isZero?.()
      ? balance.gt(
          FixedPointMath.toBigNumber(fromValue, coinsMap[type].decimals)
        )
        ? +FixedPointMath.toBigNumber(
            Number(fromValue) * 100,
            coinsMap[type].decimals
          )
            .div(balance)
            .toFixed(0)
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
            'from.value',
            String(
              FixedPointMath.toNumber(balance, coinsMap[type].decimals) *
                (value / 100)
            )
          );
          if (getValues('focus')) setValue('focus', false);
        }}
      />
    </Box>
  );
};

export default SwapFormFieldSlider;
