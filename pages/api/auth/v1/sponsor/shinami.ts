import { NextApiRequest, NextApiResponse } from 'next';

import { sponsorTx } from '@/utils/sponsored';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const response = await sponsorTx(req.body);

      return res.status(200).json(response);
    }
    return res.status(405).send('Method not allowed!');
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
