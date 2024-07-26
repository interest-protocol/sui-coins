import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { fetchNftMetadata } from '@/api/indexer';
import dbConnect from '@/server';
import NFTCollection from '@/server/model/nft-collection';
import NFTCollectionMetadata from '@/server/model/nft-collection-metadata';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await NextCors(req, res, {
      methods: ['GET', 'POST'],
      optionsSuccessStatus: 200,
      origin: process.env.ORIGIN ?? '*',
    });

    await dbConnect();

    if (req.method === 'GET') {
      const docs = await NFTCollectionMetadata.find();

      if (!docs.length) return res.status(204).json([]);

      return res.status(200).json(docs);
    }
    if (req.method === 'POST') {
      const collectionId = req.body.id;

      const data = await fetchNftMetadata(collectionId);

      if (!data) return res.status(500).send('Error fetching the data');

      const meta = await NFTCollectionMetadata.findOne({ id: collectionId });

      if (!meta)
        await (
          await NFTCollectionMetadata.create({ ...data, updatedAt: Date.now() })
        ).save();

      const holders = await NFTCollection.findOne({ collectionId });

      if (!holders)
        await (
          await NFTCollection.create({
            holders: [],
            name: data.name,
            collectionId: data.id,
          })
        ).save();

      return res.status(200).send('Data created successfully');
    }
    return res.status(405).send('Method not allowed!');
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
