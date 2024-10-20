import BigNumber from 'bignumber.js';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { DCA_COIN_MAINNET_MOCK, DCA_COIN_MAINNET_VALUE } from '@/constants/dca';
import { useHopSdk } from '@/hooks/use-hop-sdk';
import { useNetwork } from '@/hooks/use-network';
import { FixedPointMath } from '@/lib';
import { JSONQuoteResponse } from '@/server/lib/hop/hop.utils';

import { Network } from '../../constants/dapp';
import { DCAForm } from './dca.types';

const DCAQuoteManager: FC = () => {
  const hopSdk = useHopSdk();
  const network = useNetwork();
  const { setValue, control, getValues } = useFormContext<DCAForm>();

  const fromType = useWatch({ control, name: 'from.type' });
  const toType = useWatch({ control, name: 'to.type' });

  useEffect(() => {
    const coinIn =
      network === Network.MAINNET
        ? getValues('from')
        : DCA_COIN_MAINNET_MOCK[fromType];
    const coinOut =
      network === Network.MAINNET
        ? getValues('to')
        : DCA_COIN_MAINNET_MOCK[toType];

    if (!(coinIn && coinOut)) return setValue('price', null);

    hopSdk
      .quote(
        coinIn.type,
        coinOut.type,
        FixedPointMath.toBigNumber(
          network === Network.MAINNET ? 1 : DCA_COIN_MAINNET_VALUE[fromType],
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

  return null;
};

export default DCAQuoteManager;
