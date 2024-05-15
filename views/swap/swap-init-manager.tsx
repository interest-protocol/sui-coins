import { useSuiClientContext } from '@mysten/dapp-kit';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION, Network } from '@/constants';
import { useWeb3 } from '@/hooks/use-web3';
import { getCoin, isSui, updateURL } from '@/utils';

import { Aggregator, ISwapSettings, SwapForm, SwapToken } from './swap.types';

const SwapInitManager: FC = () => {
  const { coinsMap } = useWeb3();

  const form = useFormContext<SwapForm>();
  const { network } = useSuiClientContext();
  const {
    query: { to, from },
    pathname,
    asPath,
  } = useRouter();

  const settings = useReadLocalStorage<ISwapSettings>(
    `${LOCAL_STORAGE_VERSION}-sui-coins-settings`
  ) ?? { interval: '10', slippage: '0.1', aggregator: Aggregator.Hop };

  useEffect(() => {
    form.reset();
    const defaultSettings = form.getValues('settings');
    form.setValue('settings', { ...defaultSettings, ...settings });
    updateURL(pathname);
  }, [network]);

  const getSwapToken = async (
    type: `0x${string}`
  ): Promise<SwapToken | null> => {
    if (isSui(type)) {
      const decimals = 9;
      const symbol = 'SUI';
      const type = SUI_TYPE_ARG;

      return {
        type,
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

    fetch(`/api/auth/v1/coin-price?symbol=${token.symbol}`)
      .then((response) => response.json?.())
      .then((data) =>
        form.setValue(
          `${field}.usdPrice`,
          data[token.symbol][0].quote.USD.price
        )
      )
      .catch(console.log);

    return token.type;
  };

  useEffect(() => {
    const defaultSettings = form.getValues('settings');
    form.setValue('settings', { ...defaultSettings, ...settings });
  }, [settings]);

  useEffect(() => {
    (async () => {
      const searchParams = new URLSearchParams(
        asPath.replace('/', '').replace('?', '')
      );

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
export default SwapInitManager;
