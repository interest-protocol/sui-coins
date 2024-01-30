import type { NextApiRequest, NextApiResponse } from 'next';

import { Network } from '@/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    try {
      const queryObject = req.query;

      console.log(queryObject);

      const response = await fetch(
        `https://api.blockvision.org/v2/sui/coin/holders?coinType=${queryObject.coinType}&pageIndex=${queryObject.pageIndex}&pageSize=${queryObject.pageSize}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key':
              queryObject.network === Network.TESTNET
                ? process.env.BLOCKVISION_TESTNET_API_KEY!
                : process.env.BLOCKVISION_MAINNET_API_KEY!,
          },
        }
      );

      const data = await response.json();

      res.status(200).json({ data });
    } catch {
      res.status(404).json({ message: 'Failed to fetch coin holders' });
    }

    return;
  }

  res.status(404).json({ message: 'Route not found' });
}
