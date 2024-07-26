import { NextApiRequest, NextApiResponse } from 'next';

import { wipeQuestProfile } from '@/server/lib/quest/wipe';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      await wipeQuestProfile();

      res.status(200).json({ success: true });
      return;
    }

    res.status(404).send(new Error('Route not found'));
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
