import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { getOrigin } from '@/utils';
import { sponsorTx } from '@/utils/sponsored';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await NextCors(req, res, {
      methods: ['POST'],
      origin: getOrigin(),
      optionsSuccessStatus: 200,
    });

    const response = await sponsorTx(req.body);

    return res.status(200).json(response);
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
