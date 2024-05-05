import { useCurrentAccount } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { normalizeSuiAddress } from '@mysten/sui.js/utils';

import { useClammSdk } from '@/hooks/use-clamm-sdk';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { getLpCoinBytecode } from '@/lib/move-template/lp-coin';
import initMoveByteCodeTemplate from '@/lib/move-template/move-bytecode-template';
import { isSui } from '@/utils';

import { Token } from './pool-create.types';

export const useCreateLpCoin = () => {
  const currentAccount = useCurrentAccount();

  return async (tokens: ReadonlyArray<Token>) => {
    if (!currentAccount) throw new Error('No account');

    const info = {
      decimals: 9,
      totalSupply: 0n,
      recipient: currentAccount.address,
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
    };

    await initMoveByteCodeTemplate('/move_bytecode_template_bg.wasm');

    const txb = new TransactionBlock();

    const [upgradeCap] = txb.publish({
      modules: [[...getLpCoinBytecode(info)]],
      dependencies: [normalizeSuiAddress('0x1'), normalizeSuiAddress('0x2')],
    });

    txb.transferObjects([upgradeCap], txb.pure.address(currentAccount.address));

    return txb;
  };
};

export const useCreateStablePool = () => {
  const clamm = useClammSdk();
  const { coinsMap } = useWeb3();
  const currentAccount = useCurrentAccount();

  return async (
    tokens: ReadonlyArray<Token>,
    treasuryCap: string | null | undefined,
    coinType: string
  ) => {
    if (!currentAccount) throw new Error('No account');

    if (!treasuryCap) throw new Error('No authorization to use this LP coin');

    const auxTxb = new TransactionBlock();

    const coins = tokens.map(({ type, value, decimals }) => {
      if (isSui(type)) {
        const coinOut = auxTxb.splitCoins(auxTxb.gas, [
          auxTxb.pure(
            FixedPointMath.toBigNumber(value, decimals)
              .decimalPlaces(0)
              .toString()
          ),
        ]);

        return coinOut;
      } else {
        auxTxb.mergeCoins(
          auxTxb.object(coinsMap[type].coinObjectId),
          coinsMap[type].objects
            .slice(1)
            .map((object) => auxTxb.object(object.coinObjectId))
        );

        const coinOut = auxTxb.splitCoins(
          auxTxb.object(coinsMap[type].coinObjectId),
          [
            auxTxb.pure(
              FixedPointMath.toBigNumber(value, decimals)
                .decimalPlaces(0)
                .toString()
            ),
          ]
        );

        return coinOut;
      }
    });

    const typeArguments = [...tokens.map((token) => token.type), coinType];

    const { pool, poolAdmin, lpCoin, txb } = await clamm.newStable({
      coins,
      txb: auxTxb,
      lpCoinTreasuryCap: treasuryCap,
      typeArguments: typeArguments,
    });

    txb.transferObjects([poolAdmin, lpCoin], txb.pure(currentAccount.address));

    return clamm.shareStablePool({ txb, pool });
  };
};

export const useCreateVolatilePool = () => {
  const clamm = useClammSdk();
  const { coinsMap } = useWeb3();
  const currentAccount = useCurrentAccount();

  return async (
    tokens: ReadonlyArray<Token>,
    treasuryCap: string | null | undefined,
    lpCoinType: string
  ) => {
    if (!currentAccount) throw new Error('No account');

    if (!treasuryCap) throw new Error('No authorization to use this LP coin');

    const auxTxb = new TransactionBlock();

    const coins = tokens.map(({ type, value, decimals }) => {
      if (isSui(type)) {
        const coinOut = auxTxb.splitCoins(auxTxb.gas, [
          auxTxb.pure(
            FixedPointMath.toBigNumber(value, decimals)
              .decimalPlaces(0)
              .toString()
          ),
        ]);

        return coinOut;
      } else {
        if (coinsMap[type].objects.length > 1)
          auxTxb.mergeCoins(
            auxTxb.object(coinsMap[type].objects[0].coinObjectId),
            coinsMap[type].objects
              .slice(1)
              .map((object) => auxTxb.object(object.coinObjectId))
          );

        const coinOut = auxTxb.splitCoins(
          auxTxb.object(coinsMap[type].objects[0].coinObjectId),
          [
            auxTxb.pure(
              FixedPointMath.toBigNumber(value, decimals)
                .decimalPlaces(0)
                .toString()
            ),
          ]
        );

        return coinOut;
      }
    });

    const typeArguments = [...tokens.map((token) => token.type), lpCoinType];

    const PRECISION = 18;

    const price = FixedPointMath.toBigNumber(
      +tokens[0].value / +tokens[1].value,
      PRECISION
    )
      .decimalPlaces(0)
      .toString();

    const { pool, poolAdmin, lpCoin, txb } = await clamm.newVolatile({
      coins,
      txb: auxTxb,
      lpCoinTreasuryCap: treasuryCap,
      typeArguments: typeArguments,
      prices: [BigInt(price)],
    });

    txb.transferObjects([poolAdmin, lpCoin], txb.pure(currentAccount.address));

    return clamm.shareVolatilePool({ txb, pool });
  };
};