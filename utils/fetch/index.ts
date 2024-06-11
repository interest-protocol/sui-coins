import { FetchCoinMetadata } from './fetch.types';

export const fetchCoinMetadata = ({
  network,
  coinsType = [],
  type = '',
}: FetchCoinMetadata) =>
  fetch(
    `/api/v1/coin-metadata?network=${network}`.concat(
      type ? `&type=${type}` : ''
    ),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coinsType }),
    }
  );
