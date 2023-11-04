import { SUI_TYPE_ARG } from '@mysten/sui.js';

import { CreateVectorParameterArgs } from './coin.types';

export const isSymbol = (text: string): boolean =>
  new RegExp(/^[A-Z-]+$/g).test(text);

export const isType = (text: string): boolean =>
  new RegExp(/0x[a-z0-9]+::[a-z0-9_]+::[a-zA-Z0-9]+/i).test(text);

export const getSymbolByType = (type?: string): string => {
  const poolTokens = type
    ?.match(/::[a-z0-9_]+::+([^>,]+).+?::[a-z0-9_]+::([^>,]+)/i)
    ?.filter(isSymbol)
    .map((text) => text.match(/[A-Z0-9]+/g)?.[0]);

  if (!poolTokens)
    return (
      type
        ?.match(/::[a-z0-9_]+::+([^,]+)/i)
        ?.filter(isSymbol)
        .join('-') ?? ''
    );

  return poolTokens.join('-');
};

export const safeSymbol = (symbol: string, type: string): string => {
  if (isSymbol(symbol)) return symbol;

  const newSymbol =
    getSymbolByType(type) ||
    type.match(/[a-zA-Z0-9]+/g)?.pop() ||
    type.slice(-4);

  return newSymbol;
};

export const createObjectsParameter = ({
  txb,
  type,
  coinsMap,
  amount,
}: CreateVectorParameterArgs) => {
  if (type === SUI_TYPE_ARG) {
    const [coin] = txb.splitCoins(txb.gas, [txb.pure(amount.toString())]);
    return [coin];
  }

  return coinsMap[type]
    ? coinsMap[type].objects.map((x) => txb.object(x.coinObjectId))
    : [];
};
