import BigNumber from 'bignumber.js';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { DCA_COIN_MAINNET_MOCK, DCA_COIN_MAINNET_VALUE } from '@/constants/dca';
import { useHopSdk } from '@/hooks/use-hop-sdk';
import { FixedPointMath } from '@/lib';
import { JSONQuoteResponse } from '@/server/lib/hop/hop.utils';

import { DCAForm } from './dca.types';

export const useRealPrice = () => {
  const { setValue, control } = useFormContext<DCAForm>();

  const fromType = useWatch({ control, name: 'from.type' });
  const toType = useWatch({ control, name: 'to.type' });
  const hopSdk = useHopSdk();
  useEffect(() => {
    const coinIn = DCA_COIN_MAINNET_MOCK[fromType];
    const coinOut = DCA_COIN_MAINNET_MOCK[toType];

    if (!(coinIn && coinOut)) return setValue('price', null);

    hopSdk
      .quote(
        coinIn.type,
        coinOut.type,
        FixedPointMath.toBigNumber(
          DCA_COIN_MAINNET_VALUE[fromType],
          coinIn.decimals
        ).toString()
      )
      .then((route) =>
        setValue(
          'price',
          (+FixedPointMath.toNumber(
            BigNumber((route as JSONQuoteResponse).amount_out_with_fee),
            coinOut.decimals
          ).toFixed(6)).toPrecision()
        )
      )
      .catch(() => setValue('price', null));
  }, [fromType, toType]);
};
