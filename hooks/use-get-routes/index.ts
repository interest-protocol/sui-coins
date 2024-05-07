import { useSuiClient } from '@mysten/dapp-kit';
import { TransactionObjectArgument } from '@mysten/sui.js/transactions';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui.js/utils';
import { devInspectAndGetReturnValues } from '@polymedia/suits';
import BigNumber from 'bignumber.js';
import { md5 } from 'js-md5';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import invariant from 'tiny-invariant';

import { PACKAGES } from '@/constants';
import { useNetwork } from '@/context/network';
import { AmmPool, AmmServerPool } from '@/interface';
import { convertServerPoolToClientPool, findRoutes } from '@/utils';
import { constructDex } from '@/utils';

import {
  CacheValue,
  FindAmountArgs,
  RouteWithAmount,
  UseGetRoutesArgs,
} from './use-get-routes.types';

const cache = new Map<string, CacheValue>();

const findAmount = async ({
  client,
  routes,
  poolsMap,
  amount,
  isAmountIn,
  network,
}: FindAmountArgs): Promise<RouteWithAmount[]> => {
  const txbArray = [] as TransactionBlock[];

  const functionName = isAmountIn ? 'amount_out' : 'amount_in';

  const parsedRoutes = routes.map(([coinsPath, idsPath]) =>
    isAmountIn ? [coinsPath, idsPath] : [coinsPath.reverse(), idsPath.reverse()]
  );

  parsedRoutes.forEach(([coinsPath, idsPath]) => {
    const txb = new TransactionBlock();

    let amountIn: string | TransactionObjectArgument | any = amount;

    idsPath.forEach((id, index) => {
      const isFirstCall = index === 0;
      const isLastCall = index + 1 === idsPath.length;
      const poolMetadata = poolsMap[id];

      if (isLastCall || (isFirstCall && isLastCall)) {
        txb.moveCall({
          target: `${PACKAGES[network]}::quote::${functionName}`,
          typeArguments: [
            coinsPath[index],
            coinsPath[index + 1],
            poolMetadata.coinTypes.lpCoin,
          ],
          arguments: [
            txb.object(id),
            txb.object(SUI_CLOCK_OBJECT_ID),
            isFirstCall ? txb.pure.u64(amountIn.toString()) : amountIn,
          ],
        });

        txbArray.push(txb);
      }

      amountIn = txb.moveCall({
        target: `${PACKAGES[network]}::quote::${functionName}`,
        typeArguments: [
          coinsPath[index],
          coinsPath[index + 1],
          poolMetadata.coinTypes.lpCoin,
        ],
        arguments: [
          txb.object(id),
          txb.object(SUI_CLOCK_OBJECT_ID),
          isFirstCall ? txb.pure.u64(amountIn.toString()) : amountIn,
        ],
      });
    });
  });

  const promises = txbArray.map((t) =>
    devInspectAndGetReturnValues(client as any, t as any)
  );

  const results = await Promise.all(promises);

  return results.map(([result], index) => {
    invariant(result.length, 'Result is empty');
    invariant(typeof result[0] === 'string', 'Value is not a string');

    return [...routes[index], BigNumber(result[0])];
  });
};

export const useGetRoutes = ({
  coinInType,
  coinOutType,
  amount,
  isAmountIn,
}: UseGetRoutesArgs) => {
  const network = useNetwork();
  const movementClient = useSuiClient();
  const key = md5([coinInType, coinOutType].sort().toString());
  const [poolError, setPoolError] = useState<Error | undefined | null>();
  const [routesWithAmount, setRoutesWithAmount] = useState<RouteWithAmount[]>(
    []
  );
  const [poolsLoading, setPoolsLoading] = useState(false);

  const { data, isLoading, error, ...others } = useSWR<CacheValue>(
    `useGetRoutes-${key}-${network}`,
    async () => {
      if (cache.has(key)) return cache.get(key)!;

      const res = await fetch(
        `/api/auth/v1/get-pools-by-cointypes?coinInType=${coinInType}&coinOutType=${coinOutType}`
      );

      const pools = (await res.json()) as AmmServerPool[];
      const ammPools = pools.map((x) => convertServerPoolToClientPool(x));

      const dex = constructDex(ammPools);

      const poolsMap = ammPools.reduce(
        (acc, elem) => ({
          ...acc,
          [elem.poolId]: elem,
        }),
        {} as Record<string, AmmPool>
      );

      cache.set(key, { dex, poolsMap });

      return { dex, poolsMap };
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );

  useEffect(() => {
    if (data) {
      setPoolsLoading(true);
      const routes = findRoutes(data.dex, coinInType, coinOutType);

      findAmount({
        client: movementClient,
        routes,
        poolsMap: data.poolsMap,
        amount,
        isAmountIn,
        network,
      })
        .then((routes) => {
          setPoolError(null);
          setRoutesWithAmount(routes);
        })
        .catch((error) => setPoolError(error))
        .finally(() => setPoolsLoading(false));
    }
  }, [data, coinInType, coinOutType]);

  return {
    error: poolError || error,
    isLoading: poolsLoading || isLoading,
    routesWithAmount,
    ...others,
  };
};
