import { NextApiRequest, NextApiResponse } from 'next';
import { pathOr } from 'ramda';

import { Network, PAGE_SIZE } from '@/constants';
import dbConnect from '@/server';
import { getClammPools, handleServerError } from '@/server/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    const page = pathOr(1, ['query', 'page'], req);
    const limit = pathOr(PAGE_SIZE, ['query', 'limit'], req);

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
