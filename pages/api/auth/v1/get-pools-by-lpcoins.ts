import { NextApiHandler } from 'next';
import { pathOr } from 'ramda';
import invariant from 'tiny-invariant';

import { Network } from '@/constants';
import dbConnect from '@/server';
import { getPoolsByLpCoins, handleServerError } from '@/server/utils/amm-pools';
import { movementClient } from '@/utils';

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      await dbConnect();

      const lpCoins = pathOr('', ['query', 'lpCoins'], req).split(',');
      const network = pathOr(Network.DEVNET, ['query', 'network'], req);

      invariant(lpCoins.length, 'You  must pass at least one lp coin type');
      invariant(Object.values(Network).includes(network), 'Invalid network');

      const client = movementClient[network];

      invariant(client, 'Movement client not found');

      const pools = await getPoolsByLpCoins({
        client,
        network,
        lpCoins,
      });

      res.status(200).json(pools);
    }

    res.status(405).send('Method Not Allowed!');
  } catch (e) {
    res.status(500).json({
      message: handleServerError(e),
    });
  }
};

export default handler;
