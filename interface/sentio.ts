export enum Bridge {
  Celer = 'Celer',
  Wormhole = 'Wormhole',
}

export enum Chain {
  ETH = 'ETH',
  BSC = 'BSC',
  FTM = 'FTM',
  AVAX = 'AVAX',
  CELO = 'CELO',
  SOLANA = 'SOLANA',
  POLYGON = 'POLYGON',
}

export interface CoinInfo {
  symbol: string;
  name: string;
  decimals: number;
  type: string;
  bridge: null | Bridge;
  sourceChain: Chain | null;
}
