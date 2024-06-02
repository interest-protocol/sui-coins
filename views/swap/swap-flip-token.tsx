import { Button } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { MOVE_TYPE_ARG } from '@/constants';
import { SwapSVG } from '@/svg';
import { isSui, updateURL } from '@/utils';

import { SwapForm } from './swap.types';

const SwapFlipToken: FC = () => {
  const { pathname } = useRouter();
  const form = useFormContext<SwapForm>();

  const { setValue, control } = form;

  const to = useWatch({ control, name: 'to' });
  const from = useWatch({ control, name: 'from' });
  const swapping = useWatch({ control, name: 'swapping' });

  const flipToken = () => {
    if (swapping) return;
    const tmpTo = to;
    const tmpFrom = from;

    setValue('to', { ...tmpFrom, value: '' });
    setValue('from', { ...tmpTo, value: '' });

    const searchParams = new URLSearchParams();

    if (tmpTo.type)
      searchParams.set('from', isSui(tmpTo.type) ? MOVE_TYPE_ARG : tmpTo.type);

    if (tmpFrom.type)
      searchParams.set(
        'to',
        isSui(tmpFrom.type) ? MOVE_TYPE_ARG : tmpFrom.type
      );

    updateURL(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <Button
      isIcon
      p="xs"
      variant="text"
      bg="container"
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
