import { NextApiHandler } from 'next';
import NextCors from 'nextjs-cors';
import { pathOr } from 'ramda';
import invariant from 'tiny-invariant';

import { Network } from '@/constants';
import dbConnect from '@/server';
import {
  getPoolsByCoinTypes,
  handleServerError,
} from '@/server/utils/amm-pools';
import { movementClient } from '@/utils';

const handler: NextApiHandler = async (req, res) => {
  try {
    await NextCors(req, res, {
      methods: ['GET'],
      optionsSuccessStatus: 200,
      origin: 'https://movement.interestprotocol.com/',
    });

    await dbConnect();

    const coinInType = pathOr('', ['query', 'coinInType'], req);
    const coinOutType = pathOr('', ['query', 'coinOutType'], req);
    const network = pathOr(Network.DEVNET, ['query', 'network'], req);

    invariant(Object.values(Network).includes(network), 'Invalid network');

    const client = movementClient[network];

    invariant(client, 'Movement client not found');
    invariant(
      coinInType && coinOutType,
      'Please provide both a coin in and coin out types'
    );

    const pools = await getPoolsByCoinTypes({
      client,
      network,
      coinInType,
      coinOutType,
    });

    res.json(pools);
  } catch (e) {
    res.status(500).json({
      message: handleServerError(e),
    });
  }
};

export default handler;
