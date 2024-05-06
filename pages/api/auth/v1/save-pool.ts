import { NextApiHandler } from 'next';
import invariant from 'tiny-invariant';

import { Network } from '@/constants';
import dbConnect from '@/server';
import { handleServerError, savePool } from '@/server/utils/amm-pools';
import { movementClient } from '@/utils';

interface Body {
  network: Network;
  poolId: string;
}

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      await dbConnect();
      const { network, poolId } = req.body as Body;

      invariant(network && poolId, 'invalid body');

      const client = movementClient[network];

      invariant(client, 'Movement client not found');

      const result = await savePool({
        client,
        network,
        poolId,
      });

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
