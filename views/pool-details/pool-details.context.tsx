import { InterestPool } from '@interest-protocol/clamm-sdk';
import { createContext, FC, PropsWithChildren, useContext } from 'react';

import { COIN_TO_WRAPPED } from '@/constants/clamm';
import { useGetCoinMetadata } from '@/hooks/use-get-coin-metadata';
import useGetMultipleTokenPriceByType from '@/hooks/use-get-multiple-token-price-by-type';
import { useNetwork } from '@/hooks/use-network';
import { usePool } from '@/hooks/use-pools';
import { CoinMetadataWithType } from '@/interface';

interface PoolDetailsProviderProps {
  objectId: string;
}

interface PoolDetailsContext {
  loading: boolean;
  pool: InterestPool | null | undefined;
  prices: Record<string, number> | undefined;
  metadata: Record<string, CoinMetadataWithType> | undefined;
}

const INITIAL: PoolDetailsContext = {
  pool: null,
  loading: true,
  prices: undefined,
  metadata: undefined,
};

const poolDetailsContext = createContext<PoolDetailsContext>(INITIAL);

export const PoolDetailsProvider: FC<
  PropsWithChildren<PoolDetailsProviderProps>
> = ({ objectId, children }) => {
  const { Provider } = poolDetailsContext;
  const network = useNetwork();
  const {
    data: pool,
    error: poolError,
    isLoading: isPoolLoading,
  } = usePool(objectId);

  const {
    data: metadata,
    error: metadataError,
    isLoading: isMetadataLoading,
  } = useGetCoinMetadata(pool ? pool.coinTypes : []);

  const {
    data: prices,
    isLoading: isPricesLoading,
    error: pricesError,
  } = useGetMultipleTokenPriceByType(
    pool?.coinTypes.map((type) => COIN_TO_WRAPPED[network][type] ?? type) ?? []
  );

  const loading =
    isPoolLoading ||
    (!pool && !poolError) ||
    isMetadataLoading ||
    (!metadata && !metadataError) ||
    isPricesLoading ||
    (!prices && !pricesError);

  return (
    <Provider value={{ loading, pool, prices, metadata }}>{children}</Provider>
  );
};

export const usePoolDetails = () => useContext(poolDetailsContext);
