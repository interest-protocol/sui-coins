import { useCurrentAccount } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { Aftermath } from 'aftermath-ts-sdk';
import invariant from 'tiny-invariant';

import { useHopSdk } from '@/hooks/use-hop-sdk';

import { SwapForm } from './swap.types';
import { isAftermathRoute } from './swap.utils';

export const useAftermathRouter = () => new Aftermath('MAINNET').Router();

export const useSwap = () => {
  const hopSdk = useHopSdk();
  const afRouter = useAftermathRouter();
  const currentAccount = useCurrentAccount();

  return async (values: SwapForm): Promise<TransactionBlock> => {
    invariant(values.route && currentAccount, 'Something went wrong');

    if (isAftermathRoute(values.route))
      return (await afRouter.getTransactionForCompleteTradeRoute({
        walletAddress: currentAccount.address,
        completeRoute: values.route,
        slippage: Number(values.settings.slippage),
      })) as unknown as TransactionBlock;

    const trade = values.route.trade;

    return await hopSdk.swap(
      trade,
      currentAccount.address,
      +values.settings.slippage * 100
    );
  };
};
