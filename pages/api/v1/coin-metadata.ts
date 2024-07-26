import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { pathOr } from 'ramda';

import { Network } from '@/constants';
import dbConnect from '@/server';
import getCoinMetadata from '@/server/lib/coin-metadata/get-coin-metadata';
import getCoinMetadataList from '@/server/lib/coin-metadata/get-coin-metadata-list';
import { isInvalidNetwork } from '@/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await NextCors(req, res, {
      methods: ['POST'],
      optionsSuccessStatus: 200,
      origin: process.env.ORIGIN ?? '*',
    });

    await dbConnect();

    const type = req.body.type as string;
    const network = pathOr(Network.DEVNET, ['body', 'network'], req) as Network;
    const typeList = req.body.coinsType;

    if (isInvalidNetwork(network))
      return res.status(400).send({ message: 'Missing valid network' });

    if (type) {
      const doc = await getCoinMetadata(type, network);

      return res.json(doc);
    }

    if (!!typeList && Array.isArray(typeList) && !!typeList.length) {
      const data = await getCoinMetadataList(typeList, network);

      return res.json(data);
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
