import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import dbConnect from '@/server';
import { handleServerError, updateClammPools } from '@/server/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await NextCors(req, res, {
      // Options
      methods: ['GET'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    await dbConnect();

    await updateClammPools();

    res.status(200).send({ message: 'success' });
  } catch (e) {
    res.status(500).send(handleServerError(e));
  }
}
