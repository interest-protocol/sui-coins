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

  const uniqueTypeList = [...new Set(typeList)];

  const batches = chunk(uniqueTypeList, 50);

  const promises = [];

  for (const elem of batches) {
    promises.push(
      Model.find({
        type: elem,
      })
    );
  }

  const docs: Array<Array<CoinMetadataModel>> = await Promise.all(promises);
  const flattenedDocs = docs.flatMap((x) => x);

  const docsMap = flattenedDocs.reduce(
    (acc, curr) => ({ ...acc, [curr.type]: curr }),
    {} as Record<string, CoinMetadataModel>
  );

  const missingCoinsType = [
    ...new Set(uniqueTypeList.filter((type) => !docsMap[type])),
  ];

  if (!missingCoinsType.length) return docs;

  const missingCoinsTypeBatches = chunk<string>(missingCoinsType, 10);

  const missingCoinsMetadata: Array<
    CoinMetadataWithType & { hasMetadata: boolean }
  > = [];

  for (const batch of missingCoinsTypeBatches) {
    const data = await Promise.all(
      batch.map((coinType) =>
        suiClient
          .getCoinMetadata({ coinType })
          .then((metadata) => ({
            ...(metadata ?? getBasicCoinMetadata(coinType)),
            hasMetadata: !!metadata,
            type: coinType,
          }))
          .catch(() => null)
      )
    );
    const filteredData = data.filter((item) => item) as ReadonlyArray<
      CoinMetadataWithType & { hasMetadata: boolean }
    >;

    missingCoinsMetadata.push(...filteredData);
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
    ...flattenedDocs,
    ...missingCoinsMetadata.map(({ hasMetadata, ...metadata }) => metadata),
  ];
};

export default getCoinMetadataList;
