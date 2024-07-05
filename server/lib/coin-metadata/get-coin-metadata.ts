import { Network } from '@/constants';
import { getBasicCoinMetadata } from '@/utils';

import { COIN_METADATA_MODEL_MAP, SUI_CLIENT_PROVIDER_MAP } from '../utils';

const getCoinMetadata = async (type: string, network: Network) => {
  const Model = COIN_METADATA_MODEL_MAP[network];

  const doc = await Model.findOne({ type });

  if (!doc) {
    const suiClient = SUI_CLIENT_PROVIDER_MAP[network];

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
