import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { sponsorTx } from '@/utils/sponsored';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await NextCors(req, res, {
      methods: ['POST'],
      optionsSuccessStatus: 200,
      origin: process.env.ORIGIN ?? '*',
    });

    const response = await sponsorTx(req.body);

    return res.status(200).json(response);
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
