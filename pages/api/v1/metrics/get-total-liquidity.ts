import { NextApiHandler } from 'next';
import { use } from 'next-api-middleware';

import { getTotalLiquidity, TFilter } from '@/api/metrics';
import { getRequestOnlyMiddleware, logApiErrors } from '@/utils';

const handler: NextApiHandler = async (req, res) => {
  const data = await getTotalLiquidity(
    req.query.TZ as string,
    req.query.filter as TFilter
  );

  res.status(200);
  res.send(data);
};

export default use([getRequestOnlyMiddleware, logApiErrors])(handler);
