import { NextApiRequest, NextApiResponse } from 'next';

import { fetchAllHolders, fetchAllNftMetadata } from '@/api/indexer';
import dbConnect from '@/server';
import NFTCollectionModel from '@/server/model/mainnet/nft-collection';
import NFTCollectionMetadataModel from '@/server/model/mainnet/nft-collection-metadata';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    const nftsMetadata = await fetchAllNftMetadata();

    const nftsSizes = nftsMetadata.map(({ total }) => total);

    const holdersList = await Promise.all(
      nftsMetadata.map(({ id, total }) => fetchAllHolders(id, total, nftsSizes))
    );

    if (holdersList.every((holders) => !holders.length))
      throw new Error('Nothing found!');

    await Promise.all(
      nftsMetadata.map((nft) =>
        NFTCollectionMetadataModel.findOneAndUpdate(
          { id: nft.id },
          { ...nft, updatedAt: Date.now() }
        )
      )
    );

    await Promise.all(
      nftsMetadata.map(({ id, name }, index) =>
        NFTCollectionModel.findOneAndUpdate(
          {
            collectionId: id,
          },
          {
            name,
            holders: holdersList[index],
          }
        )
      )
    );

    res.status(200).send('Database updated successfully');
  } catch (e) {
    res.status(500).send(e);
  }
}
