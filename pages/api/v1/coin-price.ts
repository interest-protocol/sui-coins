import { NextApiHandler } from 'next';
import NextCors from 'nextjs-cors';

import { getOrigin } from '@/utils';

const handler: NextApiHandler = async (req, res) => {
  try {
    await NextCors(req, res, {
      methods: ['GET'],
      origin: getOrigin(),
      optionsSuccessStatus: 200,
    });

    const id = req.query.id;
    const symbol = req.query.symbol;

    if (!id && !symbol) return res.status(400).send('Invalid params');

    const result = await fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?${
        id ? 'id' : 'symbol'
      }=${id ?? symbol}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_CAP_API_KEY || '',
        },
      }
    );
    const data = await result.json();

    return res.status(200).json(data.data);
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
