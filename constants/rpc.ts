import { Network } from './dapp';

export const RPC_KEY = 'sui-coins-rpc';

export enum RpcEnum {
  shinami = 'shinami',
}

export const RPCS = [RpcEnum.shinami];

export const RPC_DISPLAY = {
  [RpcEnum.shinami]: 'Shinami',
};

export const RPC_LIST = {
  [Network.TESTNET]: {
    [RpcEnum.shinami]: process.env.NEXT_PUBLIC_SUI_TESTNET_RPC_URL,
  },
  [Network.MAINNET]: {
    [RpcEnum.shinami]: process.env.NEXT_PUBLIC_SUI_MAINNET_RPC_URL,
  },
};
