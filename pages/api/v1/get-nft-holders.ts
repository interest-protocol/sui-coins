import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/server';
import NFTCollectionModel from '@/server/model/nft-collection';

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();

    const docs = await NFTCollectionModel.find();

    if (!docs.length) return res.status(204).json([]);

    return res.status(200).json(docs);
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
