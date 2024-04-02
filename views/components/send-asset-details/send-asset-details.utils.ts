import BigNumber from 'bignumber.js';

export const getAmountsMap = (
  balances: { amount: bigint; coinType: string }[]
) =>
  balances.reduce(
    (acc, { coinType, amount }) => ({
      ...acc,
      [coinType]: BigNumber(String(amount)),
    }),
    {} as Record<`0x${string}`, BigNumber>
  );
