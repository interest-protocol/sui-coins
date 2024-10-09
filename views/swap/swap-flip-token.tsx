import { Button } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { STRICT_TOKENS_MAP } from '@/constants/coins';
import { useNetwork } from '@/hooks/use-network';
import { SwapSVG } from '@/svg';
import { updateURL, ZERO_BIG_NUMBER } from '@/utils';

import { SwapForm } from './swap.types';

const SwapFlipToken: FC = () => {
  const { pathname } = useRouter();
  const form = useFormContext<SwapForm>();
  const network = useNetwork();

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

    updateURL(
      `${pathname}?from=${
        STRICT_TOKENS_MAP[network][tmpTo?.type]?.symbol || tmpTo?.type
      }&to=${
        STRICT_TOKENS_MAP[network][tmpFrom?.type]?.symbol || tmpFrom?.type
      }`
    );
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
