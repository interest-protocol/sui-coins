import type { Token } from '@interest-protocol/sui-tokens';
import { CoinStruct } from '@mysten/sui.js/dist/cjs/client';
import { normalizeStructTag } from '@mysten/sui.js/utils';
import { normalizeSuiObjectId, SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import BigNumber from 'bignumber.js';
import { propOr } from 'ramda';

import {
  CoinObject,
  CoinsMap,
} from '@/components/web3-manager/coins-manager/coins-manager.types';
import { MOVE_TYPE_ARG, Network } from '@/constants';
import { CoinMetadataWithType } from '@/interface';
import { FixedPointMath } from '@/lib';

import { isSameStructTag } from '../address';
import { fetchCoinMetadata } from '../coin-metadata';
import { getBasicCoinMetadata } from '../fn';
import {
  CreateVectorParameterArgs,
  GetCoinsArgs,
  GetSafeValueArgs,
} from './coin.types';

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

export const getSafeTotalBalance = propOr(new BigNumber(0), 'balance') as (
  x: CoinObject
) => BigNumber;

export const getCoinTypeFromSupply = (x: string) => {
  if (!x) return '';
  const r = x.split('Supply')[1];
  return r
    .substring(1, r.length - 1)
    .replace(
      /\b0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI\b/g,
      SUI_TYPE_ARG
    );
};

export const processSafeAmount = (
  amount: BigNumber,
  type: string,
  coinsMap: CoinsMap
): BigNumber => {
  const object = coinsMap[type];

  if (!object) return amount;

  return amount.gt(object.balance) ? object.balance : amount;
};

export const getCoinsFromLpCoinType = (poolType: string) => {
  const type = poolType.split('LPCoin');
  const poolArgs = type[1];
  const tokens = poolArgs.split(',');
  return {
    coinXType: tokens[1].trim(),
    coinYType: tokens[2].split('>')[0].trim(),
  };
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
    ? coinsMap[type].objects.map((x) =>
        txb.objectRef({
          objectId: normalizeSuiObjectId(x.coinObjectId),
          digest: x.digest,
          version: x.version,
        })
      )
    : [];
};

export const isLpCoinType = (x: string) => {
  const normalized = normalizeStructTag(x.trim());
  const OTW = normalized.split('::')[2];
  return OTW.startsWith('IPX_V') || OTW.startsWith('IPX_S');
};

export const normalizeSuiType = (x: string) => {
  if (x === SUI_TYPE_ARG) return x;
  const splitType = x.split('::');

  const packageType = splitType[0];

  if (packageType.length === 66) return x;

  if (!packageType.includes('0x')) return x;

  const postOx = packageType.split('0x')[1];

  const paddedType = '0x' + postOx.padStart(64, '0');

  return [paddedType, ...splitType.slice(1)].join('::');
};

const coinObjectToToken = (coin: CoinObject): Token => ({
  name: coin.metadata.name,
  symbol: coin.symbol,
  decimals: coin.decimals,
  type: coin.type,
});

const coinMetadataToToken = (coin: CoinMetadataWithType): Token => ({
  name: coin.name,
  symbol: coin.symbol,
  decimals: coin.decimals,
  type: coin.type,
});

export const getCoin = async (
  type: `0x${string}`,
  network: Network,
  coinsMap: CoinsMap
): Promise<Token> =>
  new Promise((resolve) => {
    if (coinsMap[type]) return resolve(coinObjectToToken(coinsMap[type]));

    fetchCoinMetadata({ network, type })
      .then((metadata: CoinMetadataWithType) =>
        resolve(coinMetadataToToken(metadata))
      )
      .catch(() => resolve({ type, ...getBasicCoinMetadata(type) }));
  });

export const isSui = (type: string) =>
  isSameStructTag(type, SUI_TYPE_ARG) || isSameStructTag(type, MOVE_TYPE_ARG);

export const getCoins = async ({
  suiClient,
  coinType,
  cursor,
  account,
}: GetCoinsArgs): Promise<CoinStruct[]> => {
  const { data, nextCursor, hasNextPage } = await suiClient.getCoins({
    owner: account,
    cursor,
    coinType,
  });

  if (!hasNextPage) return data;

  const newData = await getCoins({
    suiClient,
    coinType,
    account,
    cursor: nextCursor,
  });

  return [...data, ...newData];
};

export const getSafeValue = ({
  coinValue,
  coinType,
  balance,
  decimals,
}: GetSafeValueArgs) => {
  const amount = FixedPointMath.toBigNumber(coinValue, decimals).decimalPlaces(
    0
  );

  const safeBalance = isSui(coinType) ? balance.minus(100_000_000) : balance;

  if (safeBalance.isNegative() || safeBalance.isZero())
    throw new Error('Not enough balance');

  const safeAmount = amount.gt(safeBalance) ? safeBalance : amount;

  if (safeAmount.isNegative() || safeAmount.isZero())
    throw new Error('Not valid amount');

  return safeAmount;
};
