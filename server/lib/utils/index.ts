import { SuiClient } from '@mysten/sui.js/client';

import { Network, RPC_URL } from '@/constants';
import CoinMetadata from '@/server/model/coin-metadata';
import CoinMetadataTestnet from '@/server/model/coin-metadata-testnet';

const testnetClient = new SuiClient({
  url: RPC_URL[Network.IMOLA_TESTNET],
});

const devnetClient = new SuiClient({
  url: RPC_URL[Network.DEVNET],
});

export const MOVE_CLIENT_PROVIDER_MAP = {
  [Network.DEVNET]: devnetClient,
  [Network.IMOLA_TESTNET]: testnetClient,
} as Record<Network, SuiClient>;

export const COIN_METADATA_MODEL_MAP = {
  [Network.DEVNET]: CoinMetadata,
  [Network.IMOLA_TESTNET]: CoinMetadataTestnet,
} as Record<Network, ReturnType<typeof mongoose.model>>;
