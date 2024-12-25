export const RPC_KEY = 'sui-coins-rpc';

export enum Rpc {
  fullnode = 'fullnode',
}

export const RPCS = [Rpc.fullnode];

export const RPC_DISPLAY = {
  [Rpc.fullnode]: 'Shinami',
};
