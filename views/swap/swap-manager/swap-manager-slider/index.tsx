import { Box } from '@interest-protocol/ui-kit';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { SwapForm } from '../../swap.types';

const Slider = dynamic(
  import('@interest-protocol/ui-kit').then(({ Slider }) => Slider),
  { ssr: false }
);

const SwapFormFieldSlider: FC = () => {
  const { control, setValue, getValues } = useFormContext<SwapForm>();

  const value = Number(getValues('from.value'));
  const balance = Number(useWatch({ control, name: 'from.balance' }));

  return (
    <Box mx="s">
      <Slider
        min={0}
        max={100}
        disabled={!balance}
        initial={
          value && balance
            ? balance >= value
              ? (value * 100) / balance
              : 100
            : 0
        }
        onChange={(value: number) => {
          setValue('lock', false);
          setValue('maxValue', value === 100);
          setValue('from.value', `${(value / 100) * balance}`);
        }}
      />
    </Box>
  );
};

export default SwapFormFieldSlider;
