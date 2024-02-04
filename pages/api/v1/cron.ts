import { fetchNftHolder } from 'api/indexer';
import { NextApiRequest, NextApiResponse } from 'next';
import NFTCollectionModel from 'server/model/nft-collection';

import { NFT } from '@/constants/nft';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const holdersList = await Promise.all(
      NFT.map(({ id, total }) =>
        fetchNftHolder({ collectionId: id, limit: total })
      )
    );

    if (holdersList.every((holders) => !holders.length))
      throw new Error('Nothing found!');

    const data = await Promise.all(
      NFT.map(
        async ({ id }, index) =>
          (await NFTCollectionModel.findOneAndUpdate(
            {
              collectionId: id,
            },
            {
              updatedAt: Date.now(),
              holders: holdersList[index],
            }
          )) ??
          (await NFTCollectionModel.create({
            collectionId: id,
            updatedAt: Date.now(),
            holders: holdersList[index],
          }))
      )
    );

    NFTCollectionModel.bulkSave(data);

    res.status(200).send('Database updated successfully');
  } catch (e) {
    res.status(500).send(e);
  }
}
