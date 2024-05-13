import { useCurrentAccount } from '@mysten/dapp-kit';
import { Aftermath } from 'aftermath-ts-sdk';
import invariant from 'tiny-invariant';

import { Network } from '@/constants';
import { useNetwork } from '@/context/network';
import { useHopSdk } from '@/hooks/use-hop-sdk';

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

  return async (values: SwapForm) => {
    invariant(values.route && currentAccount, 'Something went wrong');

    if (isAftermathRoute(values.route))
      return await afRouter.getTransactionForCompleteTradeRoute({
        walletAddress: currentAccount.address,
        completeRoute: values.route,
        slippage: Number(values.settings.slippage),
      });

    const trade = values.route.trade;

    return await hopSdk.swap(
      trade,
      currentAccount.address,
      +values.settings.slippage * 100
    );
  };
};
