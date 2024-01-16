import { Box, Slider } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { SwapSliderProps } from '../../swap.types';

const SwapFormFieldSlider: FC<SwapSliderProps> = ({
  balance,
  setValue,
  currentValue,
}) => (
  <Box mx="s">
    <Slider
      min={0}
      max={100}
      disabled={!balance}
      initial={
        currentValue && balance
          ? balance >= currentValue
            ? (currentValue * 100) / balance
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

export default SwapFormFieldSlider;
