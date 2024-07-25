import { formatAddress } from '@mysten/sui.js/utils';

import { Network } from '@/constants';

import { getSymbolByType } from '../coin';

export const isInvalidNetwork = (network: Network) =>
  !network || (network !== Network.DEVNET && network !== Network.IMOLA_TESTNET);

export const getBasicCoinMetadata = (type: string) => ({
  decimals: 0,
  iconUrl: null,
  description: '',
  name: formatAddress(type),
  symbol: getSymbolByType(type),
});
