import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';

import { Network } from '@/constants';
import CoinMetadata from '@/server/model/coin-metadata';
import CoinMetadataTestnet from '@/server/model/coin-metadata-testnet';
import { getBasicCoinMetadata } from '@/utils';

const testnetClient = new SuiClient({
  url: process.env.NEXT_PUBLIC_SUI_TESTNET_RPC_URL || getFullnodeUrl('testnet'),
});

const mainnetClient = new SuiClient({
  url: process.env.NEXT_PUBLIC_SUI_MAINNET_RPC_URL || getFullnodeUrl('mainnet'),
});

const provider = {
  [Network.MAINNET]: mainnetClient,
  [Network.TESTNET]: testnetClient,
} as Record<Network, SuiClient>;

const CoinMetadataModel = {
  [Network.MAINNET]: CoinMetadata,
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
