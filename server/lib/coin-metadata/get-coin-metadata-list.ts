/* eslint-disable @typescript-eslint/no-unused-vars */
import { Network } from '@/constants';
import { CoinMetadataWithType } from '@/interface';
import { CoinMetadataModel } from '@/server/model/coin-metadata';
import { getBasicCoinMetadata } from '@/utils';
import { chunk } from '@/utils';

import { COIN_METADATA_MODEL_MAP, SUI_CLIENT_PROVIDER_MAP } from '../utils';

const getCoinMetadataList = async (
  typeList: ReadonlyArray<string>,
  network: Network
) => {
  const Model = COIN_METADATA_MODEL_MAP[network];
  const suiClient = SUI_CLIENT_PROVIDER_MAP[network];

  const docs: Array<CoinMetadataModel> = await Model.find({ type: typeList });

  const docsMap = docs.reduce(
    (acc, curr) => ({ ...acc, [curr.type]: curr }),
    {} as Record<string, CoinMetadataModel>
  );

  const missingCoinsType = Array.from(
    new Set(typeList.filter((type) => !docsMap[type]))
  );

  const missingCoinsTypeBatches = chunk<string>(missingCoinsType, 7);

  const missingCoinsMetadata: Array<
    CoinMetadataWithType & { hasMetadata: boolean }
  > = [];

  for await (const batch of missingCoinsTypeBatches) {
    const data = await Promise.all(
      batch.map((coinType) =>
        suiClient.getCoinMetadata({ coinType }).then((metadata) => ({
          ...(metadata ?? getBasicCoinMetadata(coinType)),
          hasMetadata: !!metadata,
          type: coinType,
        }))
      )
    );

    data.forEach((item) => missingCoinsMetadata.push(item));
  }

  const itemsToSaveBatches = chunk<
    CoinMetadataWithType & { hasMetadata: boolean }
  >(
    missingCoinsMetadata.filter(({ hasMetadata }) => hasMetadata),
    7
  );

  for await (const itemsToSave of itemsToSaveBatches) {
    const createdItems = await Promise.all(
      itemsToSave.map(({ hasMetadata, ...metadata }) => Model.create(metadata))
    );

    await Model.bulkSave(createdItems);
  }

  return [
    ...docs,
    ...missingCoinsMetadata.map(({ hasMetadata, ...metadata }) => metadata),
  ];
};

export default getCoinMetadataList;
