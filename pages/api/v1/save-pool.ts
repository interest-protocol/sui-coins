import { NextApiHandler } from 'next';
import NextCors from 'nextjs-cors';
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
    await NextCors(req, res, {
      methods: ['POST'],
      optionsSuccessStatus: 200,
      origin: 'https://movement.interestprotocol.com/',
    });

    await dbConnect();

    const body = req.body as Body;

    const network = body.network;
    const poolId = body.poolId;

    invariant(network && poolId, 'invalid body');

    const client = movementClient[network];

    invariant(client, 'Movement client not found');

    const result = await savePool({
      client,
      network,
      poolId,
    });

    res.json(result);
  } catch (e) {
    res.status(500).json({
      message: handleServerError(e),
    });
  }
};

export default handler;
