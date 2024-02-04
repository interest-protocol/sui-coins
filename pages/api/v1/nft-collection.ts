import { NextApiRequest, NextApiResponse } from 'next';
import NFTCollectionModel from 'server/model/nft-collection';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const docs = await NFTCollectionModel.find({});

      if (!docs.length)
        return res.status(204).json({ data: { message: 'Nothing found!' } });

      return res.status(200).json(docs);
    }

    return res.status(405).send('Method Not Allowed!');
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
