import { NextApiHandler } from 'next';
import NextCors from 'nextjs-cors';
import { pathOr } from 'ramda';
import invariant from 'tiny-invariant';

import { Network } from '@/constants';
import dbConnect from '@/server';
import { getAllPools, handleServerError } from '@/server/utils/amm-pools';

const handler: NextApiHandler = async (req, res) => {
  try {
    await NextCors(req, res, {
      methods: ['GET'],
      optionsSuccessStatus: 200,
      origin: process.env.ORIGIN ?? '*',
    });

    await dbConnect();

    const page = +pathOr(1, ['query', 'page'], req);
    const findQuery = JSON.parse(pathOr('{}', ['query', 'find'], req));
    const network = pathOr(Network.TESTNET, ['query', 'network'], req);

    // Prevent ppl from passing malicious strings to DB queries
    invariant(!isNaN(page), 'Page must be a number');

    const [pools, totalPages] = await getAllPools({
      page,
      network,
      findQuery,
    });

    res.json({
      pools,
      totalPages,
    });
  } catch (e) {
    res.status(500).json({
      message: handleServerError(e),
    });
  }
};

export default handler;
