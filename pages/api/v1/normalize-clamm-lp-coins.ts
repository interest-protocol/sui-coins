import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/server';
import { normalizePoolsLpCoin } from '@/server/scripts/normalizer';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();
    await normalizePoolsLpCoin();
    res.status(200).send('Successfully');
  } catch (e) {
    res.status(500).send(e);
  }
}
