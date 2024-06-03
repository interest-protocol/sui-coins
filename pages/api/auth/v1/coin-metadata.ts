import { NextApiRequest, NextApiResponse } from 'next';

import { Network } from '@/constants';
import dbConnect from '@/server';
import getCoinMetadata from '@/server/lib/coin-metadata/get-coin-metadata';
import getCoinMetadataList from '@/server/lib/coin-metadata/get-coin-metadata-list';
import { isInvalidNetwork } from '@/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();

    if (req.method === 'GET') {
      const type = req.query.type as string;
      const network = req.query.network as Network;
      const typeList = (req.query.type_list as string)?.split(',');

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
    }

    res.status(405).send('Method not allowed!');
    return;
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
