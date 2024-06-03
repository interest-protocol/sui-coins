import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';

import { SwapForm } from '../../swap.types';

const Slider = dynamic(
  import('@interest-protocol/ui-kit').then(({ Slider }) => Slider),
  { ssr: false }
);

const SwapFormFieldSlider: FC = () => {
  const { coinsMap } = useWeb3();
  const { control, setValue, getValues } = useFormContext<SwapForm>();

  const type = useWatch({ control, name: 'from.type' });

  const balance = FixedPointMath.toNumber(
    BigNumber(coinsMap[type]?.balance.toString() || 0),
    coinsMap[type]?.decimals ?? (getValues('from.decimals') || 0)
  );

  return (
    <Box mx="s" color="onSurface">
      <Slider
        min={0}
        max={100}
        disabled={!balance}
        initial={Math.floor(
          Number(getValues('from.value')) && balance
            ? balance >= Number(getValues('from.value'))
              ? (Number(getValues('from.value')) * 100) / balance
              : 100
            : 0
        )}
        onChange={(value: number) => {
          setValue('lock', false);
          setValue('maxValue', value === 100);
          setValue(
            'from.value',
            `${Number((Number(value / 100) * balance).toFixed(6)).toPrecision()}`
          );

          if (getValues('focus')) setValue('focus', false);
        }}
      />
    </Box>
  );
};

export default SwapFormFieldSlider;
