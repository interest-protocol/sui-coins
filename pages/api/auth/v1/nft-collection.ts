import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { fetchAllHolders } from '@/api/indexer';
import { NFTCollectionMetadata } from '@/interface';
import dbConnect from '@/server';
import NFTCollectionModel from '@/server/model/nft-collection';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await NextCors(req, res, {
      methods: ['GET', 'POST'],
      optionsSuccessStatus: 200,
      origin: process.env.ORIGIN ?? '*',
    });

    await dbConnect();

    if (req.method === 'GET') {
      const id = req.query.id;

      if (id) {
        const doc = await NFTCollectionModel.findOne({ collectionId: id });

        if (!doc)
          return res.status(204).json({ data: { message: 'Nothing found!' } });

        return res.status(200).json(doc);
      }

      const docs = await NFTCollectionModel.find();

      if (!docs.length)
        return res.status(204).json({ data: { message: 'Nothing found!' } });

      return res.status(200).json(docs);
    }

    if (req.method === 'POST') {
      const body: NFTCollectionMetadata = JSON.parse(req.body);

      const holders = await fetchAllHolders(body.id, body.total, [body.total]);

      const doc = await NFTCollectionModel.create({
        holders,
        name: body.name,
        collectionId: body.id,
      });

      doc.save();

      return res.status(200).send('Data created successfully!');
    }
    return res.status(405).send('Method not allowed!');
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
