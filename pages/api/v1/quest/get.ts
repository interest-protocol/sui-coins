import { NextApiRequest, NextApiResponse } from 'next';

import { findQuestProfile } from '@/server/lib/quest';
import { getExactDayTimestamp, getFirstWeekDayTimestamp } from '@/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const address = req.query.address as string;

      const questProfile = await findQuestProfile(address);

      res.status(200).json({
        timestamp: getExactDayTimestamp(),
        currentWeek: getFirstWeekDayTimestamp(),
        data: questProfile,
      });

      return;
    }

    res.status(404).send(new Error('Route not found'));
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
