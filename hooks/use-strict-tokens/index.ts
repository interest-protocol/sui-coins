import { getSuiVerifiedCoins, Token } from '@interest-protocol/sui-tokens';
import useSWR from 'swr';

export interface StrictTokens {
  strictTokens: Array<Token>;
  strictTokensType: ReadonlyArray<string>;
  strictTokensMap: Record<string, Token>;
}

export const useStrictTokens = () =>
  useSWR<StrictTokens>('strict-tokens', async () => {
    const coins = await getSuiVerifiedCoins();

    return {
      strictTokens: Array.from(coins),
      strictTokensType: coins.map(({ type }) => type),
      strictTokensMap: coins.reduce(
        (acc, curr) => ({ ...acc, [curr.type]: curr }),
        {}
      ),
    };
  });
