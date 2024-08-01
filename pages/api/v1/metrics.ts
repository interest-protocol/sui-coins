import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { pathOr } from 'ramda';

import dbConnect from '@/server';
import quest from '@/server/model/quest';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await NextCors(req, res, {
      methods: ['GET'],
      optionsSuccessStatus: 200,
      origin: process.env.ORIGIN ?? '*',
    });

    await dbConnect();

    const findQuery = JSON.parse(pathOr('{}', ['query', 'find'], req));

    const data = await quest.countDocuments({
      timestamp: { $gte: 1722207600000 }, // get data from 29-07-2024
      ...findQuery,
    });

    res.json(data);
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
