import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';

import { useAftermathRouter } from '../swap/swap-manager/swap-manager.hooks';
import { DCAForm } from './dca.types';

const DCAQuoteManager: FC = () => {
  const afSdk = useAftermathRouter();
  const { setValue, control, getValues } = useFormContext<DCAForm>();

  const fromType = useWatch({ control, name: 'from.type' });
  const toType = useWatch({ control, name: 'to.type' });

  useEffect(() => {
    const coinIn = getValues('from');
    const coinOut = getValues('to');

    if (!(coinIn && coinOut)) return setValue('price', null);

    const coinInValue = FixedPointMath.toBigNumber(1, coinIn.decimals);

    afSdk
      .getCompleteTradeRouteGivenAmountIn({
        coinInType: coinIn.type,
        coinOutType: coinOut.type,
        coinInAmount: BigInt(coinInValue.toFixed(0)),
      })
      .then((route) =>
        setValue(
          'price',
          FixedPointMath.toNumber(
            coinInValue.div(route.spotPrice),
            coinOut.decimals
          ).toString()
        )
      )
      .catch(() => setValue('price', null));
  }, [fromType, toType]);

  return null;
};

export default DCAQuoteManager;
