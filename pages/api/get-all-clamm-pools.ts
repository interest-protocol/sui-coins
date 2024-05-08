import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { pathOr } from 'ramda';
import invariant from 'tiny-invariant';

import { Network, PAGE_SIZE } from '@/constants';
import dbConnect from '@/server';
import { getClammPools, handleServerError } from '@/server/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await NextCors(req, res, {
      // Options
      methods: ['GET'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    await dbConnect();

    const page = +pathOr(1, ['query', 'page'], req);
    const limit = +pathOr(PAGE_SIZE, ['query', 'limit'], req);

    // Prevent ppl from passing malicious strings to DB queries
    invariant(!isNaN(page), 'Page must be a number');
    invariant(!isNaN(limit), 'Page must be a number');

    const data = await getClammPools({
      network: Network.MAINNET,
      page,
      limit,
    });

    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(handleServerError(e));
  }
}
