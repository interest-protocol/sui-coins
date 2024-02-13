import { formatAddress, SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import BigNumber from 'bignumber.js';
import { propOr } from 'ramda';

import { Network } from '@/constants';
import { STRICT_TOKENS, STRICT_TOKENS_TYPE } from '@/constants/coins';
import {
  CoinObject,
  CoinsMap,
} from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { CoinMetadataWithType } from '@/interface';
import { CoinData } from '@/views/pool-details/pool-form/pool-form.types';

import { getBasicCoinMetadata } from '../fn';
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

export const getSafeTotalBalance = propOr(new BigNumber(0), 'totalBalance') as (
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

  return amount.gt(BigNumber(object.balance))
    ? BigNumber(object.balance)
    : amount;
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
    ? coinsMap[type].objects.map((x) => txb.object(x.coinObjectId))
    : [];
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

export const coinDataToCoinObject = (coinData: CoinData): CoinObject => ({
  ...coinData,
  balance: '0',
  coinObjectId: '',
  metadata: { name: formatAddress(coinData.type), description: '' },
  objects: [],
});

export const getCoin = async (
  type: string,
  network: Network,
  coinsMap: CoinsMap
): Promise<CoinMetadataWithType | CoinObject | CoinData> =>
  new Promise((resolve) => {
    if (coinsMap[type]) return resolve(coinsMap[formatAddress(type)]);

    if (STRICT_TOKENS_TYPE[network].includes(formatAddress(type)))
      return resolve(
        STRICT_TOKENS[network].find(
          ({ type: strictType }) => type === strictType
        )!
      );

    fetch(`/api/v1/coin-metadata?network=${network}&type=${type}`)
      .then((res) => res.json())
      .then((metadata) => resolve(metadata))
      .catch(() => resolve({ type, ...getBasicCoinMetadata(type) }));
  });
