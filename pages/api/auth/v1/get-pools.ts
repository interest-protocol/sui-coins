import { NextApiHandler } from 'next';
import { pathOr } from 'ramda';
import invariant from 'tiny-invariant';

import { Network } from '@/constants';
import dbConnect from '@/server';
import { getAllPools, handleServerError } from '@/server/utils/amm-pools';

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      await dbConnect();

      const page = +pathOr(1, ['query', 'page'], req);
      const findQuery = JSON.parse(pathOr('{}', ['query', 'find'], req));

      // Prevent ppl from passing malicious strings to DB queries
      invariant(!isNaN(page), 'Page must be a number');

      const [pools, totalPages] = await getAllPools({
        page,
        findQuery,
        network: Network.DEVNET,
      });

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
