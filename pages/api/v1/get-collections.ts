import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/server';
import NFTCollectionMetadata from '@/server/model/nft-collection-metadata';

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();

    const docs = await NFTCollectionMetadata.find();

    if (!docs.length) return res.status(204).json([]);

    return res.status(200).json(docs);
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
