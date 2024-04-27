import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { apiRequestIndexer } from '@/api/indexer';
import { getOrigin } from '@/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    await NextCors(req, res, {
      methods: ['POST'],
      origin: getOrigin(),
      optionsSuccessStatus: 200,
    });

    const query = req.body;

    if (!query) throw new Error('Missing an indexerQuery');

    const result = await apiRequestIndexer({
      query,
      apiKey: process.env.INDEXER_API_KEY || '',
      userApiKey: process.env.INDEXER_API_USER || '',
    });

    res.status(200).json({ data: result });
  } catch (e) {
    res.status(400).send(e);
  }
}
