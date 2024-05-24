import { TransactionBlock } from '@mysten/sui.js/transactions';
import { TransactionObjectArgument } from '@mysten/sui.js/transactions';
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui.js/utils';
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

  const txbArray = [] as TransactionBlock[];

  const functionName = isAmountIn ? 'amount_in' : 'amount_out';

  const parsedRoutes = routes.map(([coinsPath, idsPath]) => [
    coinsPath,
    idsPath,
  ]);

  parsedRoutes.forEach(([coinsPath, idsPath]) => {
    const txb = new TransactionBlock();

    let amountIn: string | TransactionObjectArgument | any = amount;

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
          arguments: [
            txb.object(id),
            txb.object(SUI_CLOCK_OBJECT_ID),
            isFirstCall ? txb.pure.u64(amountIn.toString()) : amountIn,
          ],
        });

        txbArray.push(txb);

        return;
      }

      amountIn = txb.moveCall({
        target: `${PACKAGES[network].DEX}::quote::${functionName}`,
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
    const i = result.length - 1;
    invariant(typeof result[i] === 'string', 'Value is not a string');

    return [
      ...routes[index],
      { isAmountIn, amount: BigNumber(result[i] as string) },
    ];
  });
};
