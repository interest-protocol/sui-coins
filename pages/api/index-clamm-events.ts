import { NextApiRequest, NextApiResponse } from 'next';

import { Network } from '@/constants';
import dbConnect from '@/server';
import { handleServerError, runIndexer } from '@/server/utils';

import { suiClientRecord } from '../../server/clients';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    const client = suiClientRecord[Network.MAINNET];

    runIndexer(client, Network.MAINNET);

    res.status(200).send('Database updated successfully');
  } catch (e) {
    res.status(500).send(handleServerError(e));
  }
}
