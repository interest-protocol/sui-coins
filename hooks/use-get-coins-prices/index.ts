import { COIN_TYPE, ZERO_ADDRESS } from '@interest-protocol/sui-amm-sdk';
import { pathOr } from 'ramda';
import useSWR, { SWRConfiguration } from 'swr';

import { COIN_MARKET_CAP_ID_RECORD } from '@/constants';
import { fetcher } from '@/utils';

import { useNetwork } from '../use-network';
interface CoinPricesRecordData {
  type: string;
  price: number;
}

export type CoinPriceRecord = Record<string, CoinPricesRecordData>;

export const useGetCoinsPrices = (
  coinTypes: ReadonlyArray<string>,
  config: SWRConfiguration = {}
) => {
  const { network } = useNetwork();
  const {
    data: rawData,
    error,
    isLoading,
  } = useSWR(
    `/api/v1/quote?id=${coinTypes
      .map((coinType) => COIN_MARKET_CAP_ID_RECORD[network][coinType])
      .filter((x) => x !== -1 && !!x)}`,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      refreshInterval: 0,
      ...config,
    }
  );

  const suidType = pathOr(ZERO_ADDRESS, [network, 'SUID'], COIN_TYPE) as string;

  const data = coinTypes.reduce(
    (acc, coinType) => ({
      ...acc,
      [coinType]: {
        type: coinType,
        price: pathOr(
          0,
          [
            'data',
            COIN_MARKET_CAP_ID_RECORD[network][coinType],
            'quote',
            'USD',
            'price',
          ],
          rawData
        ),
      },
    }),
    {
      [suidType]: {
        type: suidType,
        price: 1,
      },
    } as CoinPriceRecord
  );

  return {
    data,
    error,
    isLoading,
  };
};
