import { fetchNftHolder } from 'api/indexer';
import { Document } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import NFTCollectionModel from 'server/model/nft-collection';

import { NFT } from '@/constants/nft';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const holders = await Promise.all(
    NFT.map(({ id }) => fetchNftHolder({ collectionId: id, offset: '0' }))
  );

  const data: Array<Document> = await Promise.all(
    NFT.map(({ id }, index) => {
      const doc = NFTCollectionModel.findOne({
        collectionId: id,
      });

      if (!doc) {
        return NFTCollectionModel.create({
          collectionId: id,
          updatedAt: Date.now(),
          holders: holders[index],
        }) as Promise<Document>;
      }

      doc.updateOne({
        updatedAt: Date.now(),
        holders: holders[index],
      });

      return doc as unknown as Document;
    })
  );

  NFTCollectionModel.bulkSave(data);

  res.status(404).json({ message: 'Route not found' });
}
