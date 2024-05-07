import { NextApiHandler } from 'next';
import NextCors from 'nextjs-cors';
import invariant from 'tiny-invariant';

import { Network } from '@/constants';
import dbConnect from '@/server';
import { handleServerError } from '@/server/utils';
import { savePool } from '@/server/utils';

interface Body {
  network: Network;
  poolId: string;
}

const handler: NextApiHandler = async (req, res) => {
  try {
    await NextCors(req, res, {
      // Options
      methods: ['POST'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    await dbConnect();
    const { network, poolId } = req.body as Body;

    invariant(network && poolId, 'invalid body');

    const result = await savePool({
      network,
      poolId,
    });

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({
      message: handleServerError(e),
    });
  }
};

export default handler;
