import { NextApiRequest, NextApiResponse } from 'next';

import { FAUCET_COINS } from '@/constants';
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

      const quests = await getQuestsFromLast20Days(address, 'faucet');

      const is_ok = quests.every(
        (dailyQuest) =>
          dailyQuest.length &&
          FAUCET_COINS.every(({ type }) =>
            dailyQuest.some(
              (quest) =>
                quest.kind === 'faucet' && quest.data.coin.type === type
            )
          )
      );

      res.status(200).json({ is_ok });
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
