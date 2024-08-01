import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import dbConnect from '@/server';
import questProfile from '@/server/model/quest-profile';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await NextCors(req, res, {
      methods: ['GET'],
      optionsSuccessStatus: 200,
      origin: process.env.ORIGIN ?? '*',
    });

    await dbConnect();

    const data = await questProfile.countDocuments();

    res.json(data);
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
