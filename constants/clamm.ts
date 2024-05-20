import { normalizeStructTag } from '@mysten/sui.js/utils';

import { Network } from './dapp';

export const EXCHANGE_FEE = 0.002;

export const CLAMM_PACKAGE_ADDRESSES = {
  [Network.MAINNET]: {
    CLAMM: '0x429dbf2fc849c0b4146db09af38c104ae7a3ed746baf835fa57fee27fa5ff382',
    SUITEARS:
      '0x7ba65fa88ed4026304b7f95ee86f96f8169170efe84b56d465b4fe305e2486cb',
    SCALLOP_COINS_WRAPPER:
      '0x99e23018d24ede4a476bae3add60cb6531baceaee3dfcf7ce33ba4cdb3c6dd0d',
  },
  [Network.TESTNET]: {
    CLAMM: '0xa8d93d62a88d2af059dbd34e5b1d3298d885cb25a35fe972daeb8020eb0e645a',
    SUITEARS:
      '0x54a25034e68e4f7977f1f11c3c8eba99d87543248f937927fc9e8833cb5e39c4',
    SCALLOP_COINS_WRAPPER:
      '0x99e23018d24ede4a476bae3add60cb6531baceaee3dfcf7ce33ba4cdb3c6dd0d',
  },
};

export const SCALLOP_SUI_TYPE = normalizeStructTag(
  '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<0x2::sui::SUI>'
) as string;

export const SCALLOP_USDC_TYPE =
  '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN>' as string;

export const WS_SUI_TYPE =
  '0xd0be7571d8208d1d0f57bd2ab6f48cc65f67dc225115f8ca1ec93cc28fdc27d0::wrapped_scallop_sui::WRAPPED_SCALLOP_SUI' as string;

export const WS_USDC_TYPE =
  '0xd0be7571d8208d1d0f57bd2ab6f48cc65f67dc225115f8ca1ec93cc28fdc27d0::wrapped_scallop_usdc::WRAPPED_SCALLOP_USDC' as string;

export const SCALLOP_WRAPPED_COINS_TREASURY_CAPS = {
  [Network.MAINNET]: {
    [WS_SUI_TYPE]:
      '0xc7de7dc7cfd9a9f90667ad7b3b0dc680ba0488904a2b6986a9ef05f5fd078841',
    [WS_USDC_TYPE]:
      '0xca5dcd067a3cea5d088192f88e78e6d91de85829572aad83c5f9d7d6cca029b9',
  },
  [Network.TESTNET]: {
    [WS_SUI_TYPE]:
      '0xc7de7dc7cfd9a9f90667ad7b3b0dc680ba0488904a2b6986a9ef05f5fd078841',
    [WS_USDC_TYPE]:
      '0xca5dcd067a3cea5d088192f88e78e6d91de85829572aad83c5f9d7d6cca029b9',
  },
};

export const WRAPPED_CONVERSION_MAP = {
  [Network.MAINNET]: {
    [WS_USDC_TYPE]: SCALLOP_USDC_TYPE,
    [WS_SUI_TYPE]: SCALLOP_SUI_TYPE,
    [SCALLOP_USDC_TYPE]: WS_USDC_TYPE,
    [SCALLOP_SUI_TYPE]: WS_SUI_TYPE,
  },
  [Network.TESTNET]: {
    [WS_USDC_TYPE]: SCALLOP_USDC_TYPE,
    [WS_SUI_TYPE]: SCALLOP_SUI_TYPE,
    [SCALLOP_USDC_TYPE]: WS_USDC_TYPE,
    [SCALLOP_SUI_TYPE]: WS_SUI_TYPE,
  },
};

export const WRAPPED_TO_COIN = {
  [Network.MAINNET]: {
    [WS_USDC_TYPE]: SCALLOP_USDC_TYPE,
    [WS_SUI_TYPE]: SCALLOP_SUI_TYPE,
  },
  [Network.TESTNET]: {
    [WS_USDC_TYPE]: SCALLOP_USDC_TYPE,
    [WS_SUI_TYPE]: SCALLOP_SUI_TYPE,
  },
};

export const COIN_TO_WRAPPED = {
  [Network.MAINNET]: {
    [SCALLOP_USDC_TYPE]: WS_USDC_TYPE,
    [SCALLOP_SUI_TYPE]: WS_SUI_TYPE,
  },
  [Network.TESTNET]: {
    [SCALLOP_USDC_TYPE]: WS_USDC_TYPE,
    [SCALLOP_SUI_TYPE]: WS_SUI_TYPE,
  },
};

export const CLAMM_ALLOWED_NETWORKS: Record<string, Network> = {
  mainnet: Network.MAINNET,
  testnet: Network.TESTNET,
  devnet: 'sui:devnet' as Network,
};

export const OFFICIAL_KEY = 'official' as string;

export const PARTNERS_KEY = 'partners' as string;

const SCALLOP_USDC_WSUSDC_POOL =
  '0x6fc47a4c120278a30721eba138c5b19d7ea565934c33dc8facf20a79877f0a86';

const SCALLOP_SUI_WSSUI_POOL =
  '0x671343abb3bc0a2742443b835e06adc989690fc378f6bf330f7029584d30f555';

export const SCALLOP_POOLS_MAP = {
  [Network.MAINNET]: {
    [SCALLOP_USDC_WSUSDC_POOL]: SCALLOP_USDC_WSUSDC_POOL,
    [SCALLOP_SUI_WSSUI_POOL]: SCALLOP_SUI_WSSUI_POOL,
  } as Record<string, string>,
  [Network.TESTNET]: {
    [SCALLOP_USDC_WSUSDC_POOL]: SCALLOP_USDC_WSUSDC_POOL,
    [SCALLOP_SUI_WSSUI_POOL]: SCALLOP_SUI_WSSUI_POOL,
  } as Record<string, string>,
};

const OFFICIAL_POOLS = {
  [Network.MAINNET]: [SCALLOP_USDC_WSUSDC_POOL, SCALLOP_SUI_WSSUI_POOL],
  [Network.TESTNET]: [SCALLOP_USDC_WSUSDC_POOL, SCALLOP_SUI_WSSUI_POOL],
};
const PARTNER_POOLS = {
  [Network.MAINNET]: [SCALLOP_USDC_WSUSDC_POOL, SCALLOP_SUI_WSSUI_POOL],
  [Network.TESTNET]: [SCALLOP_USDC_WSUSDC_POOL, SCALLOP_SUI_WSSUI_POOL],
};

export const CATEGORY_POOLS = {
  [OFFICIAL_KEY]: OFFICIAL_POOLS,
  [PARTNERS_KEY]: PARTNER_POOLS,
};
