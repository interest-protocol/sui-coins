import { BNBSVG, SUISVG } from '@/svg';

import { Network } from '.';
import { COIN_TYPE } from './coins';

export const TOKEN_SVG_MAP = {
  [COIN_TYPE[Network.TESTNET].BNB]: BNBSVG,
  [COIN_TYPE[Network.TESTNET].SUI]: SUISVG,
  [COIN_TYPE[Network.MAINNET].NATIVE_WORMHOLE_WBNB]: BNBSVG,
  [COIN_TYPE[Network.MAINNET].SUI]: SUISVG,
};
