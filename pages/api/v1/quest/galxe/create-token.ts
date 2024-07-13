import { isValidSuiAddress } from '@mysten/sui.js/utils';
import { NextApiRequest, NextApiResponse } from 'next';

import { findQuestProfile } from '@/server/lib/quest';
import { getExactDayTimestamp } from '@/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const address = req.query.address as string;

      if (!isValidSuiAddress(address))
        return res.status(400).send(new Error('Invalid address'));

      const profile = await findQuestProfile(address);

      const is_ok = profile.lastCreateTokenAt === getExactDayTimestamp();

      res.status(200).json({ is_ok });
      return;
    }

    res.status(404).send(new Error('Route not found'));
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
