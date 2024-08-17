import { useSuiClientContext } from '@mysten/dapp-kit';
import { SUI_TYPE_ARG } from '@mysten/sui/utils';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Network } from '@/constants';
import { useWeb3 } from '@/hooks/use-web3';
import { getCoin, isSui, updateURL, ZERO_BIG_NUMBER } from '@/utils';

import { DCAForm, DCAToken } from './dca.types';

const DCAInitManager: FC = () => {
  const { coinsMap } = useWeb3();
  const form = useFormContext<DCAForm>();
  const { network } = useSuiClientContext();
  const {
    query: { to, from },
    pathname,
    asPath,
  } = useRouter();

  const getDCAToken = async (type: `0x${string}`): Promise<DCAToken | null> => {
    if (!type || (type as string) === 'null') return null;

    if (isSui(type)) {
      const decimals = 9;
      const symbol = 'SUI';
      const type = SUI_TYPE_ARG;

      return {
        type: type as `0x${string}`,
        symbol,
        decimals,
        display: '',
        value: ZERO_BIG_NUMBER,
      };
    }
    if (typeof type === 'string' && type.startsWith('0x')) {
      const coin = await getCoin(type, network as Network, coinsMap);

      return {
        ...coin,
        display: '',
        value: ZERO_BIG_NUMBER,
      };
    }
    return null;
  };

  const setDefaultToken = async (
    value: `0x${string}`,
    field: 'to' | 'from'
  ) => {
    if (!value) return;

    const token = await getDCAToken(value);

    if (!token) return;

    form.setValue(field, token);

    return token.type;
  };

  useEffect(() => {
    (async () => {
      const searchParams = new URLSearchParams(asPath.split('?')[1]);

      const [fromType, toType] = await Promise.all([
        setDefaultToken(from as `0x${string}`, 'from'),
        from !== to ? setDefaultToken(to as `0x${string}`, 'to') : undefined,
      ]);

      searchParams.delete('from');
      searchParams.delete('to');

      fromType && searchParams.set('from', fromType);
      toType && searchParams.set('to', toType);

      form.setValue('loading', false);

      const params = searchParams.toString();

      updateURL(`${pathname}${params ? `?${params}` : ''}`);
    })();
  }, []);

  return null;
};

export default DCAInitManager;
