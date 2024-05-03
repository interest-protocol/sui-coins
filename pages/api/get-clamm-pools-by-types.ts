import { normalizeStructTag } from '@mysten/sui.js/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { pathOr } from 'ramda';
import invariant from 'tiny-invariant';

import { Network } from '@/constants';
import dbConnect from '@/server';
import { getClammPoolsByCoinTypes, handleServerError } from '@/server/utils';

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

    const coinTypes = pathOr('', ['query', 'coinTypes'], req).split(',');

    invariant(coinTypes.length, 'You  must pass at least one coin type');

    const data = await getClammPoolsByCoinTypes({
      network: Network.MAINNET,
      // Assume this throws if it is not a struct tag
      coinTypes: coinTypes.map((x) => normalizeStructTag(x)),
    });

    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(handleServerError(e));
  }
}
