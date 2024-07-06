import { NextApiRequest, NextApiResponse } from 'next';

import { addNewQuest } from '@/server/lib/quest/add-new-quest';
import { getQuests } from '@/server/lib/quest/get-quests';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const body = req.body;

      const data = await addNewQuest(body);

      res.status(200).json(data);
    }
    if (req.method === 'GET') {
      const address = req.query.address as string;

      const quests = await getQuests(address, 'swap');

      res.status(200).json({ data: { is_ok: quests.length ? 1 : 0 } });
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
