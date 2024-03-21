import { Box } from '@interest-protocol/ui-kit';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
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

  const type = useWatch({ control, name: 'from.type' });

  const safeRemoval =
    type === SUI_TYPE_ARG
      ? FixedPointMath.toBigNumber(1, getValues('from.decimals'))
      : ZERO_BIG_NUMBER;

  const balance = coinsMap[type]
    ? coinsMap[type].balance.minus(safeRemoval)
    : ZERO_BIG_NUMBER;

  const fromValue = type
    ? FixedPointMath.toBigNumber(
        getValues('from.value'),
        getValues('from.decimals')
      )
    : ZERO_BIG_NUMBER;

  return (
    <Box mx="s">
      <Slider
        min={0}
        max={100}
        disabled={!balance}
        initial={Math.floor(
          !fromValue.isZero() && !balance.isZero()
            ? balance.gt(fromValue)
              ? (FixedPointMath.toNumber(fromValue) * 100) /
                FixedPointMath.toNumber(balance, getValues('from.decimals'))
              : 100
            : 0
        )}
        onChange={(value: number) => {
          setValue(
            'from.value',
            Number(
              (
                FixedPointMath.toNumber(balance, getValues('from.decimals')) *
                (value / 100)
              ).toFixed(6)
            ).toPrecision()
          );
        }}
      />
    </Box>
  );
};

export default SwapFormFieldSlider;
