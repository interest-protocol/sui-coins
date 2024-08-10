import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { pathOr } from 'ramda';

import { Network } from '@/constants';
import dbConnect from '@/server';
import metrics from '@/server/model/metrics';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await NextCors(req, res, {
      methods: ['GET'],
      optionsSuccessStatus: 200,
      origin: process.env.ORIGIN ?? '*',
    });

    await dbConnect();

    const network = pathOr(Network.TESTNET, ['query', 'network'], req);

    const data = await metrics.findOne({ network });

    res.json(data?.weekly);
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
