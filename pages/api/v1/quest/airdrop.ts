import { NextApiRequest, NextApiResponse } from 'next';

import { addNewQuest } from '@/server/lib/quest/add-new-quest';
import { getQuestsFromLast20Days } from '@/server/lib/quest/get-quests';
import { Quest } from '@/server/model/quest';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const body = req.body as Quest;

      const data = await addNewQuest(body);

      res.status(200).json(data);
    }
    if (req.method === 'GET') {
      const address = req.query.address as string;

      const quests = await getQuestsFromLast20Days(address, 'airdrop');

      const is_ok = quests.every(
        (dailyQuest) =>
          dailyQuest.length &&
          dailyQuest.some(
            (quest) =>
              quest.kind === 'airdrop' && quest.data.addressesCount >= 10
          )
      );

      res.status(200).json({ is_ok });
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
