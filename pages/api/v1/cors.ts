import { NextApiRequest, NextApiResponse } from 'next';

import { getOrigin } from '@/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json({
      origin: getOrigin(),
      headers: req.headers,
    });
  } catch (e) {
    res.status(200).json({ error: e });
  }
};

export default handler;
