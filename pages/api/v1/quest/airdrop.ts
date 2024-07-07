import { NextApiRequest, NextApiResponse } from 'next';

import { addQuest, findQuestProfile } from '@/server/lib/quest/add-new-quest';
import { Quest } from '@/server/model/quest';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const body = req.body as Quest;

      const data = await addQuest(body, 'airdrop');

      res.status(200).json(data);
    }
    if (req.method === 'GET') {
      const address = req.query.address as string;

      const profile = await findQuestProfile(address);

      const is_ok = Object.values(profile.airdrop).length === 20;

      res.status(200).json({ is_ok });
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
