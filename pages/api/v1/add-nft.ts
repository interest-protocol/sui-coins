import { NextApiRequest, NextApiResponse } from 'next';

import { fetchNftMetadata } from '@/api/indexer';
import NFTCollection from '@/server/model/nft-collection';
import NFTCollectionMetadata from '@/server/model/nft-collection-metadata';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;

    const metadata = await fetchNftMetadata(id);

    if (!metadata) throw new Error('Metadata not fetched');

    await Promise.all([
      NFTCollectionMetadata.create({
        ...metadata,
        updatedAt: Date.now(),
      }).then((doc) => doc.save()),
      NFTCollection.create({
        holders: [],
        name: metadata.name,
        collectionId: metadata.id,
      }).then((doc) => doc.save()),
    ]);

    return res.status(200).send('Data created successfully');
  } catch (e) {
    res.status(500).send('Something went wrong!');
  }
};

export default handler;
