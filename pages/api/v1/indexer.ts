import { NextApiRequest, NextApiResponse } from 'next';

import { apiRequestIndexer } from '@/api/indexer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    try {
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

  res.status(404).json({ message: 'Route not found' });
}
