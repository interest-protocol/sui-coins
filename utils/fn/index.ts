import { formatAddress } from '@mysten/sui/utils';

import { Network } from '@/constants';

import { getSymbolByType } from '../coin';

export const noop: any = () => {};

export const isInvalidNetwork = (network: Network) =>
  !network || (network !== Network.MAINNET && network !== Network.TESTNET);

export const getBasicCoinMetadata = (type: string) => ({
  decimals: 0,
  iconUrl: null,
  description: '',
  name: formatAddress(type),
  symbol: getSymbolByType(type),
});
