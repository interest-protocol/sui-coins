import { NextApiRequest, NextApiResponse } from 'next';

import { addQuest } from '@/server/lib/quest';
import { Quest } from '@/server/model/quest';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const body = req.body as Quest;

      const data = await addQuest(body, body.kind);

      return res.status(200).json(data);
    }
    res.status(404).send(new Error('Route not found'));
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
