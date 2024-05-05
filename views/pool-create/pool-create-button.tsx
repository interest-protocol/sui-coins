import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CreatePoolForm } from './pool-create.types';

const PoolCreateButton: FC = () => {
  const { control, setValue } = useFormContext<CreatePoolForm>();
  const { step, isStable, tokens } = useWatch({ control });

  const isDisabled = [
    isStable === undefined,
    !tokens?.every(
      ({ type, value, symbol, decimals }) =>
        type && symbol && Number(value) && String(decimals)
    ),
  ];

  const handleClick = [
    null,
    () =>
      setValue('tokens', [
        { type: '' as `0x${string}`, symbol: '', decimals: 0, value: '' },
        { type: '' as `0x${string}`, symbol: '', decimals: 0, value: '' },
      ]),
    () => setValue('dex', ''),
  ];

  return (
    <Button
      mx="auto"
      variant="filled"
      disabled={isDisabled[step!]}
      onClick={() => {
        handleClick[step!]?.();
        setValue('step', step! + 1);
      }}
    >
      Next
    </Button>
  );
};

export default PoolCreateButton;
