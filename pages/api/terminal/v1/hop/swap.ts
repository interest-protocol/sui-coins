import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import invariant from 'tiny-invariant';

import { swap, SwapArg } from '@/server/lib/hop';
import { handleServerError } from '@/server/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await NextCors(req, res, {
      methods: ['POST'],
      optionsSuccessStatus: 200,
      origin: '*',
    });

    const data = req.body as SwapArg;

    invariant(data, 'Missing parameters');

    const txb = await swap(data);

    res.status(200).json({ txb });
  } catch (e) {
    res.status(500).send(handleServerError(e));
  }
}
