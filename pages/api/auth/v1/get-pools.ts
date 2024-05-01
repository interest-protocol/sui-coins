import { NextApiHandler } from 'next';
import { pathOr } from 'ramda';
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
      const pageNumber = pathOr(1, ['query', 'pageNumber'], req);

      invariant(client, 'Movement client not found');

      const [pools, totalPages] = await getAllPools(client, pageNumber);

      res.status(200).json({
        pools,
        totalPages,
      });
    }

    res.status(405).send('Method Not Allowed!');
  } catch (e) {
    res.status(500).json({
      message: handleServerError(e),
    });
  }
};

export default handler;
