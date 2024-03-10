import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CreatePoolForm } from './pool-create.types';

const PoolCreateButton: FC = () => {
  const { control, setValue } = useFormContext<CreatePoolForm>();
  const { step, type, isStable } = useWatch({ control });

  const isDisabled = [type === undefined, isStable === undefined];
  const handleClick = [
    null,
    () =>
      setValue('tokens', [
        { type: '', symbol: '', decimals: 0, value: '' },
        { type: '', symbol: '', decimals: 0, value: '' },
      ]),
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
