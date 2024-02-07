import { NextApiRequest, NextApiResponse } from 'next';

import { Network } from '@/constants';
import { CoinMetadataWithType } from '@/interface';
import dbConnect from '@/server';
import getCoinMetadata from '@/server/lib/get-coin-metadata';
import CoinMetadataModel from '@/server/model/coin-metadata';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();

    if (req.method === 'GET') {
      const type = req.query.type as string;
      const network = req.query.network as Network;
      const typeList = (req.query.type_list as string)?.split(',');

      if (type && network) {
        const doc = getCoinMetadata(type, network);

        if (!doc) {
          res.status(204).send('No data found!');
          return;
        }

        res.status(200).json(doc);
        return;
      }

      if (typeList && Array.isArray(typeList) && typeList.length) {
        const data = await CoinMetadataModel.find({
          type: typeList.map((type) => type),
        });

        if (!data.length) {
          res.status(204).send('No data found!');
          return;
        }

        res.status(200).json(data);
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
      const data: CoinMetadataWithType | ReadonlyArray<CoinMetadataWithType> =
        JSON.parse(req.body);

      if (Array.isArray(data)) {
        const docs = await Promise.all(
          data.map((item) => CoinMetadataModel.create(item))
        );

        if (!docs.length) {
          res.status(204).send('Nothing to send!');
          return;
        }

        CoinMetadataModel.bulkSave(docs);
        res.status(201).send('Data created successfully!');
        return;
      }

      const doc = await CoinMetadataModel.create(data);

      if (!data) {
        res.status(400).send('Sent data is incompatible!');
        return;
      }

      doc.save();
      res.status(201).send('Data created successfully!');
      return;
    }

    res.status(405).send('Method Not Allowed!');
    return;
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
