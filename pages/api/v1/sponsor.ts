import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { claimer, sender, network, transactionBlockKindBytes } = req.body;

      const data = await fetch(process.env.SPONSOR!, {
        method: 'POST',
        body: JSON.stringify({
          sender,
          claimer,
          network,
          transactionBlockKindBytes,
        }),
      }).then((response) => response.json?.());

      return res.status(200).json(data);
    }
    return res.status(405).send('Method not allowed!');
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
