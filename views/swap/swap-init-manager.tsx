import { SUI_TYPE_ARG } from '@mysten/sui/utils';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION, Network } from '@/constants';
import { STRICT_TOKENS, STRICT_TOKENS_MAP } from '@/constants/coins';
import { getAllCoinsPrice } from '@/hooks/use-get-multiple-token-price-by-type/use-get-multiple-token-price-by-type.utils';
import { useNetwork } from '@/hooks/use-network';
import { useWeb3 } from '@/hooks/use-web3';
import { getCoin, isSui, updateURL, ZERO_BIG_NUMBER } from '@/utils';

import { Aggregator, ISwapSettings, SwapForm, SwapToken } from './swap.types';

const SwapInitManager: FC = () => {
  const { coinsMap } = useWeb3();
  const form = useFormContext<SwapForm>();
  const network = useNetwork();
  const {
    query: { to, from },
    pathname,
    asPath,
  } = useRouter();

  const settings = useReadLocalStorage<ISwapSettings>(
    `${LOCAL_STORAGE_VERSION}-sui-coins-settings`
  ) ?? { interval: '10', slippage: '0.1', aggregator: Aggregator.Aftermath };

  useEffect(() => {
    form.reset();
    const defaultSettings = form.getValues('settings');
    form.setValue('settings', {
      ...defaultSettings,
      ...settings,
      aggregator: Aggregator.Aftermath,
    });
    updateURL(pathname);
  }, [network]);

  const getSwapToken = async (
    type: `0x${string}`
  ): Promise<SwapToken | null> => {
    if (!type) return null;

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
        value: ZERO_BIG_NUMBER,
      };
    }
    if (typeof type === 'string' && type.startsWith('0x')) {
      const coin = await getCoin(type, network as Network, coinsMap);

      return {
        ...coin,
        display: '',
        usdPrice: null,
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

    const token = await getSwapToken(value);

    if (!token) return;

    form.setValue(field, token);

    getAllCoinsPrice([token.type], network)
      .then((data) => form.setValue(`${field}.usdPrice`, data[token.type]))
      .catch(console.log);

    return STRICT_TOKENS_MAP[network][token.type]?.symbol || token.type;
  };

  const setTokenType = async (
    from: string | undefined,
    to: string | undefined
  ) => {
    const TokenUSDC = STRICT_TOKENS[network].find(
      (token) => token.symbol == 'USDC'
    );

    if (!from && !to)
      return await Promise.all([
        setDefaultToken(SUI_TYPE_ARG as `0x${string}`, 'from'),
        setDefaultToken(TokenUSDC?.type as `0x${string}`, 'to'),
      ]);

    if (to && !from) {
      if (!STRICT_TOKENS_MAP[network][to]) {
        if (TokenUSDC?.symbol == to) from = SUI_TYPE_ARG;
        if (STRICT_TOKENS_MAP[network][SUI_TYPE_ARG]?.symbol === to)
          from = TokenUSDC?.type;
      }
    }

    if (from && !to) {
      if (!STRICT_TOKENS_MAP[network][from]) {
        if (TokenUSDC?.symbol == from) to = SUI_TYPE_ARG;
        if (STRICT_TOKENS_MAP[network][SUI_TYPE_ARG]?.symbol === from)
          to = TokenUSDC?.type;
      }
    }

    return await Promise.all([
      from
        ? setDefaultToken(
            STRICT_TOKENS_MAP[network][from]?.type ||
              STRICT_TOKENS[network].find(
                (token) => token.symbol == from || token.type == from
              )?.type ||
              from,
            'from'
          )
        : undefined,
      to
        ? from !== to
          ? setDefaultToken(
              STRICT_TOKENS_MAP[network][to]?.type ||
                STRICT_TOKENS[network].find(
                  (token) => token.symbol == to || token.type == to
                )?.type ||
                to,
              'to'
            )
          : undefined
        : undefined,
    ]);
  };

  useEffect(() => {
    const defaultSettings = form.getValues('settings');
    form.setValue('settings', {
      ...defaultSettings,
      ...settings,
    });
  }, [settings]);

  useEffect(() => {
    (async () => {
      const searchParams = new URLSearchParams(asPath.split('?')[1]);

      const [fromType, toType] = await setTokenType(
        from as `0x${string}`,
        to as `0x${string}`
      );

      searchParams.delete('from');
      searchParams.delete('to');

      fromType && searchParams.set('from', fromType);
      toType && searchParams.set('to', toType);

      form.setValue('loading', false);

      updateURL(
        `${pathname}?from=${searchParams.get('from')}&to=${searchParams.get(
          'to'
        )}`
      );
    })();
  }, [network, to, from]);

  return null;
};

export default SwapInitManager;
