import { FetchCoinMetadata } from './fetch.types';

export const fetchCoinMetadata = ({
  network,
  coinsType = [],
  type,
}: FetchCoinMetadata) =>
  fetch('/api/v1/coin-metadata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ coinsType, network, type: type ? type : null }),
  });
