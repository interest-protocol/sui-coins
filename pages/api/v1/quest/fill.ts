import { NextApiRequest, NextApiResponse } from 'next';

import { fillQuestProfile } from '@/server/lib/quest/fill';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const address = req.query.address as string;

      await fillQuestProfile(address);

      res.status(200).json({ success: true });
      return;
    }

    res.status(404).send(new Error('Route not found'));
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
