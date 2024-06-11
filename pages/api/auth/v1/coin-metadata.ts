import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { Network } from '@/constants';
import dbConnect from '@/server';
import getCoinMetadata from '@/server/lib/coin-metadata/get-coin-metadata';
import getCoinMetadataList from '@/server/lib/coin-metadata/get-coin-metadata-list';
import { isInvalidNetwork } from '@/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    await NextCors(req, res, {
      // Options
      methods: ['POST'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const type = req.query.type as string;
    const network = req.query.network as Network;
    const typeList = req.body.coinsType;

    if (isInvalidNetwork(network))
      return res.status(400).send({ message: 'Missing valid network' });

    if (type) {
      const doc = await getCoinMetadata(type, network);

      return res.status(200).json(doc);
    }

    if (typeList && Array.isArray(typeList) && typeList.length) {
      const data = await getCoinMetadataList(typeList, network);

      return res.status(200).json(data);
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;

export const config = {
  api: {
    responseLimit: false,
  },
};
