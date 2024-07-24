import { normalizeStructTag } from '@mysten/sui/utils';

import { Network } from '@/constants';
import { COIN_TO_WRAPPED, WRAPPED_TO_COIN } from '@/constants/clamm';
import { CMC_COIN_ID } from '@/constants/coins';

export const getCMCPrices = (types: ReadonlyArray<string>, network: Network) =>
  fetch(
    `/api/auth/v1/coin-price?id=${types.map(
      (type) => CMC_COIN_ID[network][type]
    )}`,
    {
      next: { revalidate: 1800 },
      headers: { Accept: 'application/json' },
    }
  )
    .then((res) => res.json?.())
    .then((data) => {
      console.log({ data });

      return types.reduce(
        (acc, type) => ({
          ...acc,
          [WRAPPED_TO_COIN[network][type] ?? type]:
            data[CMC_COIN_ID[network][type]].quote.USD.price,
        }),
        {} as Record<string, number>
      );
    })
    .catch(() => ({}) as Record<string, number>);

export const getAFPrices = (types: ReadonlyArray<string>, network: Network) =>
  fetch(
    encodeURI(
      `https://aftermath.finance/api/price-info/["${types.join('","')}"]`
    ),
    {
      next: { revalidate: 1800 },
      headers: { Accept: 'application/json' },
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

  if (!convertedTypes.filter((type) => CMC_COIN_ID[network][type]).length)
    return getAFPrices(
      convertedTypes.filter((type) => !CMC_COIN_ID[network][type]),
      network
    );

  if (!convertedTypes.filter((type) => !CMC_COIN_ID[network][type]).length)
    return getCMCPrices(
      convertedTypes.filter((type) => CMC_COIN_ID[network][type]),
      network
    );

  const [pricesAF, pricesCMC] = await Promise.all([
    getAFPrices(
      convertedTypes.filter((type) => !CMC_COIN_ID[network][type]),
      network
    ),
    getCMCPrices(
      convertedTypes.filter((type) => CMC_COIN_ID[network][type]),
      network
    ),
  ]);

  return { ...pricesAF, ...pricesCMC };
};
