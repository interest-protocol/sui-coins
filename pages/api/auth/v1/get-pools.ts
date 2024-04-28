import { NextApiHandler } from 'next';
import invariant from 'tiny-invariant';

import { Network } from '@/constants';
import dbConnect from '@/server';
import { getAllPools, handleServerError } from '@/server/utils';
import { movementClient } from '@/utils';

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      await dbConnect();

      const client = movementClient[Network.DEVNET];

      invariant(client, 'Movement client not found');

      const result = await getAllPools(client);

      res.status(200).json(result);
    }

    res.status(405).send('Method Not Allowed!');
  } catch (e) {
    res.status(500).json({
      message: handleServerError(e),
    });
  }
};

export default handler;
