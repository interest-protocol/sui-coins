import { isValidSuiAddress } from '@mysten/sui.js/utils';

export const csvToAirdrop = (csv: string): ReadonlyArray<[string, number]> => {
  const lines = csv.split('\n');

  return lines.reduce(
    (acc, line) => {
      const lineColumns = line.split(',');

      const address = lineColumns[0];
      const amount = Number(lineColumns[1]);

      if (!isValidSuiAddress(address) || isNaN(amount)) return acc;

      return [...acc, [address, Number(lineColumns[1])]];
    },
    [] as ReadonlyArray<[string, number]>
  );
};
