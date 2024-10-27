import { normalizeStructTag } from '@mysten/sui/utils';

import { Network } from '@/constants';
import { COIN_TO_WRAPPED, WRAPPED_TO_COIN } from '@/constants/clamm';

export const getPrices = (types: ReadonlyArray<string>, network: Network) =>
  fetch(
    encodeURI(`https://rates-api-production.up.railway.app/api/fetch-quote`),
    {
      method: 'POST',
      next: { revalidate: 1800 },
      headers: { accept: '*/*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ coins: types }),
    }
  )
    .then((res) => res.json?.())
    .then((data) =>
      types.reduce(
        (acc, type) =>
          data[normalizeStructTag(type)].price > 0
            ? {
                ...acc,
                [WRAPPED_TO_COIN[network][type] ?? type]:
                  data[normalizeStructTag(type)].price,
              }
            : acc,
        {} as Record<string, number>
      )
    )
    .catch(() => ({}) as Record<string, number>);

export const getAllCoinsPrice = async (
  types: ReadonlyArray<string>,
  network: Network
) => {
  const convertedTypes = types.map(
    (type) => COIN_TO_WRAPPED[network][type] ?? type
  );

  if (!convertedTypes.length) return {};

  return getPrices(convertedTypes, network);
};
