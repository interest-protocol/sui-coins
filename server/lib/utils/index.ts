import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';

import { Network } from '@/constants';
import CoinMetadata from '@/server/model/coin-metadata';
import CoinMetadataTestnet from '@/server/model/coin-metadata-testnet';

const testnetClient = new SuiClient({
  url: process.env.NEXT_PUBLIC_SUI_TESTNET_RPC_URL || getFullnodeUrl('testnet'),
});

const mainnetClient = new SuiClient({
  url: process.env.NEXT_PUBLIC_SUI_MAINNET_RPC_URL || getFullnodeUrl('mainnet'),
});

export const SUI_CLIENT_PROVIDER_MAP = {
  [Network.MAINNET]: mainnetClient,
  [Network.TESTNET]: testnetClient,
} as Record<Network, SuiClient>;

export const COIN_METADATA_MODEL_MAP = {
  [Network.MAINNET]: CoinMetadata,
  [Network.TESTNET]: CoinMetadataTestnet,
} as Record<Network, ReturnType<typeof mongoose.model>>;
