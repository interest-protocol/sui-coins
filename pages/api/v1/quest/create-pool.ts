import { NextApiRequest, NextApiResponse } from 'next';

import { addNewQuest } from '@/server/lib/quest/add-new-quest';
import { getQuestsFromLast20Days } from '@/server/lib/quest/get-quests';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const body = req.body;

      const data = await addNewQuest(body);

      res.status(200).json(data);
    }
    if (req.method === 'GET') {
      const address = req.query.address as string;

      const quests = await getQuestsFromLast20Days(address, 'createPool');

      const is_ok = quests.every((dailyQuest) => dailyQuest.length);

      res.status(200).json({ is_ok });
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
