import { NextApiRequest, NextApiResponse } from 'next';

import { addQuest, findQuestProfile } from '@/server/lib/quest/add-new-quest';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const body = req.body;

      const data = await addQuest(body, 'faucet');

      res.status(200).json(data);
    }
    if (req.method === 'GET') {
      const address = req.query.address as string;

      const profile = await findQuestProfile(address);

      const is_ok =
        Object.values(profile.faucet).filter((data) => {
          const dataValues = Object.values(data);
          return dataValues.every((x) => x >= 1) && dataValues.length === 5;
        }).length === 20;

      res.status(200).json({ is_ok });
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
