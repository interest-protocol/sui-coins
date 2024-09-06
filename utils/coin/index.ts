import { Token } from '@interest-protocol/sui-tokens';
import { CoinStruct } from '@mysten/sui/client';
import { TransactionResult } from '@mysten/sui/transactions';
import { formatAddress, SUI_TYPE_ARG } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';

import { Network } from '@/constants';
import {
  CELER_TOKENS,
  CELER_TOKENS_TYPE,
  STRICT_TOKENS,
  STRICT_TOKENS_TYPE,
  WORMHOLE_TOKENS,
  WORMHOLE_TOKENS_TYPE,
} from '@/constants/coins';
import { CoinData, CoinMetadataWithType } from '@/interface';
import { FixedPointMath } from '@/lib';

import {
  CoinObject,
  CoinsMap,
} from '../../components/web3-manager/coins-manager/coins-manager.types';
import { isSameStructTag } from '../address';
import { ZERO_BIG_NUMBER } from '../big-number';
import { fetchCoinMetadata } from '../coin-metadata';
import { getBasicCoinMetadata } from '../fn';
import {
  CoinOfValueArgs,
  GetCoinOfValueArgs,
  GetCoinsArgs,
  GetSafeValueArgs,
} from './coin.types';

export const isSymbol = (text: string): boolean =>
  new RegExp(/^[A-Z-]+$/g).test(text);

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

export const safePoolSymbolFromType = (type: string): string =>
  type.split('::')[2];

export const coinDataToCoinObject = (coinData: CoinData): CoinObject => ({
  ...coinData,
  balance: ZERO_BIG_NUMBER,
  metadata: { name: formatAddress(coinData.type), description: '' },
  objects: [],
});

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
    if (
      STRICT_TOKENS_TYPE[network].includes(type) ??
      WORMHOLE_TOKENS_TYPE[network].includes(type) ??
      CELER_TOKENS_TYPE[network].includes(type)
    )
      return resolve(
        STRICT_TOKENS[network].find(
          ({ type: strictType }) => type === strictType
        ) ??
          WORMHOLE_TOKENS[network].find(
            ({ type: strictType }) => type === strictType
          ) ??
          CELER_TOKENS[network].find(
            ({ type: strictType }) => type === strictType
          )!
      );

    if (coinsMap[type]) return resolve(coinObjectToToken(coinsMap[type]));

    fetchCoinMetadata({ network, type })
      .then((metadata) =>
        resolve(coinMetadataToToken(metadata as CoinMetadataWithType))
      )
      .catch(() => resolve({ type, ...getBasicCoinMetadata(type) }));
  });

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

export function removeLeadingZeros(address: string): string {
  return address.replaceAll(/0x0+/g, '0x');
}

export async function getCoinOfValue({
  suiClient,
  coinValue,
  coinType,
  tx,
  account,
}: GetCoinOfValueArgs): Promise<TransactionResult> {
  coinType = removeLeadingZeros(coinType);

  if (isSui(coinType)) return tx.splitCoins(tx.gas, [tx.pure.u64(coinValue)]);

  const paginatedCoins = await getCoins({
    suiClient,
    coinType,
    cursor: null,
    account,
  });

  // Merge all coins into one
  const [firstCoin, ...otherCoins] = paginatedCoins;

  const firstCoinInput = tx.object(firstCoin.coinObjectId);

  if (otherCoins.length > 0) {
    tx.mergeCoins(
      firstCoinInput,
      otherCoins.map((coin) => coin.coinObjectId)
    );
  }

  return tx.splitCoins(firstCoinInput, [tx.pure.u64(coinValue)]);
}

export function coinOfValue({
  coinValue,
  coinType,
  tx,
  coinsMap,
}: CoinOfValueArgs): TransactionResult {
  coinType = removeLeadingZeros(coinType);

  if (isSui(coinType)) return tx.splitCoins(tx.gas, [tx.pure.u64(coinValue)]);

  // Merge all coins into one
  const [firstCoin, ...otherCoins] = coinsMap[coinType].objects;

  const firstCoinInput = tx.object(firstCoin.coinObjectId);

  if (otherCoins.length > 0)
    tx.mergeCoins(
      firstCoinInput,
      otherCoins.map((coin) => coin.coinObjectId)
    );

  return tx.splitCoins(firstCoinInput, [tx.pure.u64(coinValue)]);
}

export const isSui = (type: string) => isSameStructTag(type, SUI_TYPE_ARG);

export const getSafeValue = ({
  coinValue,
  coinType,
  balance,
  decimals,
}: GetSafeValueArgs) => {
  const amount0 = FixedPointMath.toBigNumber(coinValue, decimals).decimalPlaces(
    0
  );
  const safeBalance = isSui(coinType) ? balance.minus(1_000_000_000) : balance;
  const safeAmount0 = amount0.gt(safeBalance) ? safeBalance : amount0;

  return safeAmount0.isNegative() ? BigNumber(0) : safeAmount0;
};
