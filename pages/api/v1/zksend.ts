import { NextApiRequest, NextApiResponse } from 'next';

import { Network } from '@/constants';
import { ZkSendLinkData } from '@/interface';
import dbConnect from '@/server';
import ZkSendLinkModelMainnet from '@/server/model/zksend-link';
import ZkSendLinkModelTestnet from '@/server/model/zksend-link-testnet';
import { isInvalidNetwork } from '@/utils';

const ZkSendLinkModel = {
  [Network.TESTNET]: ZkSendLinkModelTestnet,
  [Network.MAINNET]: ZkSendLinkModelMainnet,
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();

    const network = req.query.network as Network;

    if (isInvalidNetwork(network))
      return res.status(400).send({ message: 'Missing param: valid network' });

    if (req.method === 'GET') {
      const id = req.query.id as string;

      if (id) {
        const doc = await ZkSendLinkModel[network].findOne({ id });

        if (!doc)
          return res.status(204).json({ data: { message: 'Nothing found!' } });

        return res.status(200).json(doc);
      }

      return res.status(400).send({ message: 'Missing param: id' });
    }

    if (req.method === 'POST') {
      const body: ZkSendLinkData = JSON.parse(req.body);

      const doc = await ZkSendLinkModel[network].create(body);

      doc.save();

      return res.status(200).send('Link created successfully!');
    }

    if (req.method === 'PUT') {
      const digest = req.query.digest as string;
      const body: ZkSendLinkData = JSON.parse(req.body);

      if (digest) {
        const doc = await ZkSendLinkModel[network].findOneAndUpdate(
          { digest },
          body
        );

        if (!doc) (await ZkSendLinkModel[network].create(body)).save();

        return res.status(200).send('Link updated successfully!');
      }

      return res.status(400).send({ message: 'Missing param: digest' });
    }
    return res.status(405).send('Method not allowed!');
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
