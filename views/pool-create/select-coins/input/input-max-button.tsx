import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks';
import { FixedPointMath } from '@/lib';

import { CreatePoolForm } from '../../pool-create.types';
import { InputProps } from './input.types';

const InputMaxButton: FC<InputProps> = ({ index }) => {
  const { coinsMap } = useWeb3();
  const { control, setValue } = useFormContext<CreatePoolForm>();

  const type = useWatch({ control, name: `tokens.${index}.type` });

  return (
    <Button
      px="s"
      variant="text"
      color="primary"
      onClick={() =>
        setValue(
          `tokens.${index}.value`,
          String(
            FixedPointMath.toNumber(
              coinsMap[type].balance,
              coinsMap[type].decimals
            )
          )
        )
      }
    >
      max
    </Button>
  );
};

export default InputMaxButton;
