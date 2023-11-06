import {
  Connection,
  devnetConnection,
  JsonRpcProvider,
  mainnetConnection,
  testnetConnection,
} from '@mysten/sui.js';

import { Network } from '@/constants';

import { useNetwork } from '../use-network';

const rpcUrl = {
  [Network.DEVNET]: process.env.NEXT_PUBLIC_SUI_DEVNET_RPC_URL,
  [Network.TESTNET]: process.env.NEXT_PUBLIC_SUI_TESTNET_RPC_URL,
  [Network.MAINNET]: process.env.NEXT_PUBLIC_SUI_MAINNET_RPC_URL,
};

const defaultConnection = {
  [Network.DEVNET]: devnetConnection,
  [Network.TESTNET]: testnetConnection,
  [Network.MAINNET]: mainnetConnection,
};

export const useProvider = () => {
  const { network } = useNetwork();

  return new JsonRpcProvider(
    rpcUrl[network]
      ? new Connection({
          fullnode: rpcUrl[network] || defaultConnection[network].fullnode,
          faucet: devnetConnection.faucet || defaultConnection[network].faucet,
          websocket:
            process.env.NEXT_PUBLIC_SUI_DEVNET_WS_URL ||
            defaultConnection[network].websocket,
        })
      : defaultConnection[network]
  );
};
