import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';

import { Network } from '@/constants';
import { getBasicCoinMetadata } from '@/hooks/use-get-all-coins';
import CoinMetadataModel from '@/server/model/coin-metadata';

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

const getCoinMetadata = async (type: string, network = Network.MAINNET) => {
  const doc = await CoinMetadataModel.findOne({ type });

  if (!doc || !doc.id) {
    const suiClient = provider[network];

    const coinMetadata = await suiClient
      .getCoinMetadata({ coinType: type })
      .then((metadata) => ({
        ...(metadata ?? getBasicCoinMetadata(type)),
        type,
      }));

    const newDoc = await CoinMetadataModel.create(coinMetadata);

    newDoc.save();

    return newDoc;
  }

  return doc;
};

export default getCoinMetadata;
