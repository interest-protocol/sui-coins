import { Box } from '@interest-protocol/ui-kit';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
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

  const safeRemoval =
    type === SUI_TYPE_ARG ? 10 ** getValues('from.decimals') : 0;

  const balance = FixedPointMath.toNumber(
    BigNumber(coinsMap[type] ? +coinsMap[type].balance - safeRemoval : 0),
    coinsMap[type]?.decimals ?? (getValues('from.decimals') || 0)
  );

  return (
    <Box mx="s">
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
          setValue(
            'from.value',
            `${Number(((value / 100) * balance).toFixed(6)).toPrecision()}`
          );
        }}
      />
    </Box>
  );
};

export default SwapFormFieldSlider;
