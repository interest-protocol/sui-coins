import { Button } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { SwapSVG } from '@/svg';
import { updateURL } from '@/utils';

import { SwapForm } from './swap.types';

const SwapFlipToken: FC = () => {
  const { pathname } = useRouter();
  const form = useFormContext<SwapForm>();

  const { setValue, control } = form;

  const to = useWatch({ control, name: 'to' });
  const from = useWatch({ control, name: 'from' });

  const flipToken = () => {
    const tmpTo = to;
    const tmpFrom = from;
    setValue('to', { ...tmpFrom, value: '' });
    setValue('from', { ...tmpTo, value: '' });

    updateURL(`${pathname}?from=${tmpTo.type}&to=${tmpFrom.type}`);
  };

  return (
    <Button
      isIcon
      bg="onPrimary"
      width="1.5rem"
      height="1.5rem"
      color="primary"
      variant="filled"
      onClick={flipToken}
      disabled={!to && !from}
      nHover={{ bg: 'lowContainer' }}
    >
      <SwapSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
    </Button>
  );
};

export default SwapFlipToken;
