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
      NFTCollectionMetadata.findOne({ id }).then((doc) => {
        if (!doc) return;
        return NFTCollectionMetadata.deleteOne(doc as any);
      }),
      NFTCollection.findOne({ collectionId: id }).then((doc) => {
        if (!doc) return;
        return NFTCollection.deleteOne(doc as any);
      }),
    ]);

    return res.status(200).send('Data deleted successfully');
  } catch (e) {
    res.status(500).send('Something went wrong!');
  }
};

export default handler;
