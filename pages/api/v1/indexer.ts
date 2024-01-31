import { NextApiRequest, NextApiResponse } from 'next';

import { apiRequestIndexer } from '@/utils/indexer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    try {
      const query = req.query.indexerQuery;

      if (!query) throw new Error('Missing an indexerQuery');

      const result = await apiRequestIndexer({
        query: query,
        apiKey: process.env.INDEXER_API_KEY || '',
        userApiKey: process.env.INDEXER_API_USER || '',
      });

      res.status(200).json({ data: result });
    } catch (e) {
      res.status(404).json({ error: e });
    }
  }

  res.status(404).json({ message: 'Route not found' });
}
