import { NextApiRequest, NextApiResponse } from 'next';

import { Network } from '@/constants';
import { fillMetrics } from '@/server/lib/quest/fill';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      await fillMetrics(Network.TESTNET);

      res.status(200).json({ success: true });
      return;
    }

    res.status(404).send(new Error('Route not found'));
  } catch (e) {
    console.log(e);

    res.status(500).send(e);
  }
};

export default handler;
