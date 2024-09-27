import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { SwapSVG } from '@/components/svg';
import { ZERO_BIG_NUMBER } from '@/utils';

import { SwapForm } from './swap.types';

const SwapFlipToken: FC = () => {
  const form = useFormContext<SwapForm>();

  const { setValue, control } = form;

  const to = useWatch({ control, name: 'to' });
  const from = useWatch({ control, name: 'from' });
  const swapping = useWatch({ control, name: 'swapping' });

  const flipToken = () => {
    if (swapping) return;
    const tmpTo = to;
    const tmpFrom = from;
    setValue('to', { ...tmpFrom, display: '' });
    setValue('from', { ...tmpTo, display: '', value: ZERO_BIG_NUMBER });
  };

  return (
    <Button
      isIcon
      p="xs"
      variant="text"
      bg="onPrimary"
      width="1.5rem"
      height="1.5rem"
      color="onSurface"
      borderRadius="full"
      onClick={flipToken}
      disabled={(!to && !from) || swapping}
    >
      <SwapSVG maxWidth="1.25rem" maxHeight="1.25rem" width="100%" />
    </Button>
  );
};

export default SwapFlipToken;
