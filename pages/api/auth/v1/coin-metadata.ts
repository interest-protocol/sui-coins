import { NextApiRequest, NextApiResponse } from 'next';

import { Network } from '@/constants';
import dbConnect from '@/server';
import getCoinMetadata from '@/server/lib/coin-metadata/get-coin-metadata';
import getCoinMetadataList from '@/server/lib/coin-metadata/get-coin-metadata-list';
import { isInvalidNetwork } from '@/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();

    const type = req.body.type as string;
    const network = req.body.network as Network;
    const typeList = req.body.coinsType;

    if (isInvalidNetwork(network))
      return res.status(400).send({ message: 'Missing valid network' });

    if (type) {
      const doc = await getCoinMetadata(type, network);

      return res.status(200).json(doc);
    }

    if (!!typeList && Array.isArray(typeList) && !!typeList.length) {
      const data = await getCoinMetadataList(typeList, network);

      return res.status(200).json(data);
    }

    return res.status(404).json({ message: 'No coin type requested' });
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
