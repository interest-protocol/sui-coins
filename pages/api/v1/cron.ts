import { fetchAllHolders } from 'api/indexer';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'server';
import NFTCollectionModel from 'server/model/nft-collection';

import { NFT } from '@/constants/nft';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    const holdersList = await Promise.all(
      NFT.map(({ id, total }) => fetchAllHolders(id, total))
    );

    if (holdersList.every((holders) => !holders.length))
      throw new Error('Nothing found!');

    await Promise.all(
      NFT.map(({ id, name }, index) =>
        NFTCollectionModel.findOneAndUpdate(
          {
            collectionId: id,
          },
          {
            name,
            updatedAt: Date.now(),
            holders: holdersList[index],
          }
        )
      )
    );

    res.status(200).send('Database updated successfully');
  } catch (e) {
    console.log(JSON.stringify(e));

    res.status(500).send(e);
  }
}
