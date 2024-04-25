import { createLPCoin } from '@interest-protocol/clamm';

import { Token } from './pool-create.types';

export const getLpCoin = (tokens: ReadonlyArray<Token>, address: string) =>
  createLPCoin({
    decimals: 9,
    totalSupply: 0n,
    recipient: address,
    imageUrl: 'https://www.interestprotocol.com/logo.png',
    name: `i${tokens.reduce(
      (acc, { symbol }) => `${acc ? `${acc}/` : ''}${symbol.toUpperCase()}`,
      ''
    )}`,
    symbol: `ipx-s-${tokens.reduce(
      (acc, { symbol }) => `${acc ? `${acc}-` : ''}${symbol.toLowerCase()}`,
      ''
    )}`,
    description: `CLAMM Interest Protocol LpCoin for ${tokens.reduce(
      (acc, { symbol }) => `${acc ? `${acc}/` : ''}${symbol.toUpperCase()}`,
      ''
    )}`,
  });
