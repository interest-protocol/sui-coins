import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/server';
import NFTCollectionMetadata from '@/server/model/nft-collection-metadata';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();

    if (req.method === 'GET') {
      const docs = await NFTCollectionMetadata.find();

      if (!docs.length) return res.status(204).json([]);

      return res.status(200).json(docs);
    }
    return res.status(405).send('Method not allowed!');
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
