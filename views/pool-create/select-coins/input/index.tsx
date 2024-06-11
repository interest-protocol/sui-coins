import { Box } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { parseInputEventToNumberString } from '@/utils';
import { TokenField } from '@/views/pool-create/select-coins/input/token-field';

import useEventListener from '../../../../hooks/use-event-listener';
import { CreatePoolForm } from '../../pool-create.types';
import Balance from './balance';
import FormInputDollar from './form-input-dollar';
import { InputProps } from './input.types';
import InputMaxButton from './input-max-button';
import SelectToken from './select-token';

const Input: FC<InputProps> = ({ index }) => {
  const { register, setValue } = useFormContext<CreatePoolForm>();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleSetMobile = useCallback(() => {
    const mediaIsMobile = !window.matchMedia('(max-width: 26.875rem)').matches;
    setIsMobile(mediaIsMobile);
  }, []);

  useEventListener('resize', handleSetMobile, true);

  return (
    <Box
      width="100%"
      display=" flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
    >
      <TokenField
        active
        opacity="0.7"
        placeholder="--"
        variant="outline"
        textAlign="right"
        status="none"
        Bottom={<FormInputDollar index={index} />}
        {...register(`tokens.${index}.value`, {
          onChange: (v: ChangeEvent<HTMLInputElement>) => {
            setValue?.(
              `tokens.${index}.value`,
              parseInputEventToNumberString(v)
            );
          },
        })}
        Balance={<Balance index={index} />}
        ButtonMax={<InputMaxButton index={index} />}
        TokenIcon={<SelectToken index={index} isMobile={isMobile} />}
      />
    </Box>
  );
};

export default Input;
