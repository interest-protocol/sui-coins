import { Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { SwapForm } from '../swap.types';

const PriceImpact: FC = () => {
  const { control } = useFormContext<SwapForm>();
  const fromValue = useWatch({ control, name: 'from.value' });
  const fromUSDPrice = useWatch({ control, name: 'from.usdPrice' });
  const toValue = useWatch({ control, name: 'to.display' });
  const toUSDPrice = useWatch({ control, name: 'to.usdPrice' });
  const toUSD = toUSDPrice ? +toValue * toUSDPrice : null;
  const fromUSD = fromUSDPrice ? +fromValue * fromUSDPrice : null;

  const differenceBetween = fromUSD && toUSD ? toUSD - fromUSD : null;

  const priceImpact =
    differenceBetween && fromUSD ? (differenceBetween * 100) / fromUSD : null;

  if (!priceImpact) return null;

  const STATUS =
    Number(priceImpact) < 1
      ? 'success'
      : Number(priceImpact) < 5
        ? 'warning'
        : 'error';

  return (
    <Typography
      bg={STATUS}
      size="small"
      variant="label"
      fontSize="s"
      color="lowestContainer"
      px="xs"
      py="2xs"
      borderRadius="full"
    >
      {priceImpact
        ? `${priceImpact > 0.1 ? priceImpact.toFixed(2) : '< 0.1'}%`
        : '--'}
    </Typography>
  );
};

export default PriceImpact;
