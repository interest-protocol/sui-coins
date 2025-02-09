import { Network } from './dapp';

export const RPC_KEY = 'sui-coins-rpc';

export enum RPCEnum {
  Shinami = 'shinami',
  Mysten = 'mysten',
  SuiScan = 'suiscan',
  Suiet = 'suiet',
  ChainBase = 'chainbase',
  NodeInfra = 'nodeinfra',
}

export const RPCS = [
  RPCEnum.Shinami,
  RPCEnum.Suiet,
  RPCEnum.Mysten,
  RPCEnum.SuiScan,
  RPCEnum.ChainBase,
  RPCEnum.NodeInfra,
];

export const RPC_DISPLAY = {
  [RPCEnum.Shinami]: 'Shinami (Recommended)',
  [RPCEnum.Mysten]: 'Mysten Public RPC',
  [RPCEnum.ChainBase]: 'Chainbase',
  [RPCEnum.NodeInfra]: 'NodeInfra',
  [RPCEnum.SuiScan]: 'SuiScan',
  [RPCEnum.Suiet]: 'Suiet',
};

export const RPC_MAP = {
  [Network.TESTNET]: {
    [RPCEnum.Shinami]:
      'https://api.shinami.com/node/v1/sui_testnet_8d0574f74958d67931463c51da36bc24',
    [RPCEnum.ChainBase]: 'https://testnet-rpc.sui.chainbase.online',
    [RPCEnum.NodeInfra]: 'https://sui-testnet.nodeinfra.com',
    [RPCEnum.Mysten]: 'https://fullnode.testnet.sui.io:443',
    [RPCEnum.SuiScan]: 'https://rpc-testnet.suiscan.xyz',
    [RPCEnum.Suiet]: 'https://testnet.suiet.app',
  },
  [Network.MAINNET]: {
    [RPCEnum.Shinami]:
      'https://api.shinami.com/node/v1/sui_mainnet_f8ba2ad72d9ad60899e56d2f9d813e2b',
    [RPCEnum.ChainBase]: 'https://mainnet-rpc.sui.chainbase.online',
    [RPCEnum.NodeInfra]: 'https://sui-mainnet.nodeinfra.com',
    [RPCEnum.Mysten]: 'https://fullnode.mainnet.sui.io:443',
    [RPCEnum.SuiScan]: 'https://rpc-mainnet.suiscan.xyz',
    [RPCEnum.Suiet]: 'https://mainnet.suiet.app',
  },
};
