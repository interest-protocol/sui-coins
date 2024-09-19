import { NextApiRequest, NextApiResponse } from 'next';
import invariant from 'tiny-invariant';

import { swap, SwapArg } from '@/server/lib/hop';
import { handleServerError } from '@/server/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const account = req.query.account as string;
    const slippage = Number(req.query.slippage);
    const trade = JSON.parse(req.query.trade as string);

    const data: SwapArg = {
      account,
      slippage,
      trade,
    };

    invariant(data, 'Missing parameters');

    const txb = await swap(data);

    res.status(200).json({ txb });
  } catch (e) {
    res.status(500).send(handleServerError(e));
  }
}
