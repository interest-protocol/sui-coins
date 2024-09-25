import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/server';
import NFTCollectionModel from '@/server/model/nft-collection';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();

    const id = req.query.id;

    if (id) {
      const doc = await NFTCollectionModel.findOne({ collectionId: id });

      if (!doc)
        return res.status(204).json({ data: { message: 'Nothing found!' } });

      return res.status(200).json(doc);
    }
    return res.status(401).json({ data: { message: 'Missing Params!' } });
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
