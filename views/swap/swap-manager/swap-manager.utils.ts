import { TransactionBlock } from '@mysten/sui.js/transactions';
import { devInspectAndGetReturnValues } from '@polymedia/suits';
import BigNumber from 'bignumber.js';
import invariant from 'tiny-invariant';

import { PACKAGES } from '@/constants';

import { FindAmountArgs, RouteWithAmount } from './swap-manager.types';

export const findAmount = async ({
  client,
  routes,
  poolsMap,
  amount,
  isAmountIn,
  network,
}: FindAmountArgs): Promise<RouteWithAmount[]> => {
  if (!+amount)
    return routes.map(([coinsPath, idsPath]) => [
      coinsPath,
      idsPath,
      {
        isAmountIn,
        amount: BigNumber(0),
      },
    ]);

  const functionName = isAmountIn ? 'amount_in' : 'amount_out';

  const parsedRoutes = routes.map(([coinsPath, idsPath]) => [
    coinsPath,
    idsPath,
  ]);

  const txb = new TransactionBlock();

  parsedRoutes.forEach(([coinsPath, idsPath]) => {
    let amountIn: any = txb.pure.u64(amount.toString());

    idsPath.forEach((id, index) => {
      const isFirstCall = index === 0;
      const isLastCall = index + 1 === idsPath.length;
      const poolMetadata = poolsMap[id];

      if (isLastCall || (isFirstCall && isLastCall)) {
        txb.moveCall({
          target: `${PACKAGES[network].DEX}::quote::${functionName}`,
          typeArguments: [
            coinsPath[index],
            coinsPath[index + 1],
            poolMetadata.coinTypes.lpCoin,
          ],
          arguments: [txb.object(id), amountIn],
        });

        return;
      }

      amountIn = txb.moveCall({
        target: `${PACKAGES[network].DEX}::quote::${functionName}`,
        typeArguments: [
          coinsPath[index],
          coinsPath[index + 1],
          poolMetadata.coinTypes.lpCoin,
        ],
        arguments: [txb.object(id), amountIn],
      });
    });
  });

  const results = await devInspectAndGetReturnValues(
    client as never,
    txb as never
  );

  let x = results;

  return routes.map((route) => {
    const pools = route[1];
    const r = x.slice(0, pools.length);
    x = x.slice(pools.length);

    invariant(r.length, 'Result is empty');
    const i = r.length - 1;
    invariant(r[i].length, 'Result is empty');

    invariant(typeof r[i][0] === 'string', 'Value is not a string');

    return [...route, { isAmountIn, amount: BigNumber(r[i][0] as string) }];
  });
};
