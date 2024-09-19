import { NextApiRequest, NextApiResponse } from 'next';
import invariant from 'tiny-invariant';

import { quote } from '@/server/lib/hop';
import { quoteResponseToJSONQuoteResponse } from '@/server/lib/hop/hop.utils';
import { handleServerError } from '@/server/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const coinIn = req.query.coinIn as string;
    const coinOut = req.query.coinOut as string;
    const amountIn = req.query.amountIn as string;

    invariant(coinIn && coinOut && amountIn, 'Missing parameters');

    const data = await quote(coinIn, coinOut, BigInt(amountIn));

    res.status(200).json(quoteResponseToJSONQuoteResponse(data));
  } catch (e) {
    res.status(500).send(handleServerError(e));
  }
}
