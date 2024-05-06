import { Network } from './dapp';

export const EXCHANGE_FEE = 0.002;

export const CLAMM_PACKAGE_ADDRESSES = {
  [Network.MAINNET]: {
    CLAMM: '0x429dbf2fc849c0b4146db09af38c104ae7a3ed746baf835fa57fee27fa5ff382',
    SUITEARS:
      '0x7ba65fa88ed4026304b7f95ee86f96f8169170efe84b56d465b4fe305e2486cb',
  },
  [Network.TESTNET]: {
    CLAMM: '0xa8d93d62a88d2af059dbd34e5b1d3298d885cb25a35fe972daeb8020eb0e645a',
    SUITEARS:
      '0x54a25034e68e4f7977f1f11c3c8eba99d87543248f937927fc9e8833cb5e39c4',
  },
};

export const CLAMM_ALLOWED_NETWORKS: Record<string, Network> = {
  mainnet: Network.MAINNET,
  testnet: Network.TESTNET,
  devnet: 'sui:devnet' as Network,
};
