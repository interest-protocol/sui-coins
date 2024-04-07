import { SuiClient } from '@mysten/sui.js/client';

import { Network, RPC_URL } from '@/constants';
import CoinMetadata from '@/server/model/coin-metadata';
import CoinMetadataTestnet from '@/server/model/coin-metadata-testnet';
import { getBasicCoinMetadata } from '@/utils';

const testnetClient = new SuiClient({
  url: RPC_URL[Network.TESTNET],
});

const devnetClient = new SuiClient({
  url: RPC_URL[Network.DEVNET],
});

const provider = {
  [Network.DEVNET]: devnetClient,
  [Network.TESTNET]: testnetClient,
} as Record<Network, SuiClient>;

const CoinMetadataModel = {
  [Network.DEVNET]: CoinMetadata,
  [Network.TESTNET]: CoinMetadataTestnet,
} as Record<Network, ReturnType<typeof mongoose.model>>;

const getCoinMetadata = async (type: string, network: Network) => {
  const Model = CoinMetadataModel[network];

  const doc = await Model.findOne({ type });

  if (!doc) {
    const suiClient = provider[network];

    const { hasMetadata, ...metadata } = await suiClient
      .getCoinMetadata({ coinType: type })
      .then((metadata) => ({
        ...(metadata ?? getBasicCoinMetadata(type)),
        hasMetadata: !!metadata,
        type,
      }));

    if (hasMetadata) {
      const newDoc = await Model.create(metadata);
      newDoc.save();
    }

    return metadata;
  }

  return doc;
};

export default getCoinMetadata;
