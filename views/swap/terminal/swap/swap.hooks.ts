import { useCurrentAccount } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { Aftermath } from 'aftermath-ts-sdk';
import invariant from 'tiny-invariant';

import { Network } from '@/constants';
import { useHopSdk } from '@/hooks/use-hop-sdk';
import { useNetwork } from '@/hooks/use-network';

import { SwapForm } from './swap.types';
import { isAftermathRoute } from './swap.utils';

const INIT_ARG = {
  [Network.TESTNET]: 'TESTNET',
  [Network.MAINNET]: 'MAINNET',
};

export const useAftermathRouter = () => {
  const network = useNetwork();

  return new Aftermath(INIT_ARG[network]).Router();
};

export const useSwap = () => {
  const hopSdk = useHopSdk();
  const afRouter = useAftermathRouter();
  const currentAccount = useCurrentAccount();

  return async (values: SwapForm): Promise<Transaction> => {
    invariant(values.route && currentAccount, 'Something went wrong');

    if (isAftermathRoute(values.route))
      return afRouter.getTransactionForCompleteTradeRoute({
        walletAddress: currentAccount.address,
        completeRoute: values.route,
        slippage: Number(values.settings.slippage) / 100,
      });

    const trade = values.route.trade;

    return hopSdk.swap(
      trade,
      currentAccount.address,
      +values.settings.slippage * 100
    ) as unknown as Transaction;
  };
};
