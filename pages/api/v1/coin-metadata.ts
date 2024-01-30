import { NextApiRequest, NextApiResponse } from 'next';
import db from 'server';
import CoinMetadataModel from 'server/model';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db;

    if (req.method === 'GET') {
      const type = req.query.type;

      if (type) {
        const doc = await CoinMetadataModel.findOne({ type });

        if (!doc) {
          res.status(204).send('No data found!');
          return;
        }

        res.status(200).json(doc);
        return;
      }

      const data = await CoinMetadataModel.find({});

      if (!data) {
        res.status(204).send('No data found!');
        return;
      }

      res.status(200).json(data);
      return;
    }
    if (req.method === 'POST') {
      const data = JSON.parse(req.body);

      const doc = await CoinMetadataModel.create(data);

      if (!doc) {
        res.status(400).send('Sent data is incompatible!');
        return;
      }
      doc.save();
      res.status(200).send('Data sent successfully!');
      return;
    }
    res.status(405).send('Method Not Allowed!');
    return;
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
