import { SUI_TYPE_ARG } from '@mysten/sui/utils';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Network } from '@/constants';
import { getAllCoinsPrice } from '@/hooks/use-get-multiple-token-price-by-type/use-get-multiple-token-price-by-type.utils';
import { useNetwork } from '@/hooks/use-network';
import { useWeb3 } from '@/hooks/use-web3';
import { getCoin, isSui } from '@/utils';

import { SwapForm, SwapInitManagerProps, SwapToken } from './swap.types';

const SwapInitManager: FC<SwapInitManagerProps> = ({ to, from }) => {
  const { coinsMap } = useWeb3();
  const form = useFormContext<SwapForm>();
  const network = useNetwork();

  const getSwapToken = async (
    type: `0x${string}`
  ): Promise<SwapToken | null> => {
    if (isSui(type)) {
      const decimals = 9;
      const symbol = 'SUI';
      const type = SUI_TYPE_ARG;

      return {
        type: type as `0x${string}`,
        symbol,
        decimals,
        display: '',
        usdPrice: null,
      };
    }
    if (typeof type === 'string' && type.startsWith('0x')) {
      const coin = await getCoin(type, network as Network, coinsMap);

      return {
        ...coin,
        display: '',
        usdPrice: null,
      };
    }
    return null;
  };

  const setDefaultToken = async (
    value: `0x${string}`,
    field: 'to' | 'from'
  ) => {
    if (!value) return;

    const token = await getSwapToken(value);

    if (!token) return;

    form.setValue(field, token);

    getAllCoinsPrice([token.type], network)
      .then((data) => form.setValue(`${field}.usdPrice`, data[token.type]))
      .catch(console.log);

    return token.type;
  };

  useEffect(() => {
    Promise.all([
      setDefaultToken(from as `0x${string}`, 'from'),
      from !== to ? setDefaultToken(to as `0x${string}`, 'to') : undefined,
    ]).then(() => {
      form.setValue('loading', false);
    });
  }, []);

  return null;
};

export default SwapInitManager;
