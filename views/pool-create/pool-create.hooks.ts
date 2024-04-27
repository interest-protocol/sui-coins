import { CLAMM } from '@interest-protocol/clamm-sdk';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { normalizeSuiAddress } from '@mysten/sui.js/utils';

import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { getLpCoinBytecode } from '@/lib/move-template/lp-coin';
import initMoveByteCodeTemplate from '@/lib/move-template/move-bytecode-template';

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

    txb.transferObjects([upgradeCap], txb.pure(currentAccount.address));

    return txb;
  };
};

export const useCreateStablePool = () => {
  const client = useSuiClient();
  const { coinsMap } = useWeb3();
  const currentAccount = useCurrentAccount();

  return async (
    tokens: ReadonlyArray<Token>,
    treasuryCap: string | null | undefined,
    coinType: string
  ) => {
    if (!currentAccount) throw new Error('No account');

    if (!treasuryCap) throw new Error('No authorization to use this LP coin');

    const mergeTxb = new TransactionBlock();

    const coins = tokens.map(({ type }) =>
      mergeTxb.mergeCoins(
        coinsMap[type].coinObjectId,
        coinsMap[type].objects.slice(1).map((object) => object.coinObjectId)
      )
    );

    const typeArguments = [...tokens.map((token) => token.type), coinType];

    const clamm = new CLAMM(
      client,
      process.env.CLAMM_PACKAGE_ID!,
      process.env.CLAMM_SUI_TEARS_PACKAGE_ID!
    );

    const { pool, poolAdmin, lpCoin, txb } = await clamm.newStable({
      coins,
      txb: mergeTxb,
      lpCoinTreasuryCap: treasuryCap,
      typeArguments: typeArguments,
    });

    txb.transferObjects([poolAdmin, lpCoin], txb.pure(currentAccount.address));

    return clamm.shareStablePool({ txb, pool });
  };
};

export const useCreateVolatilePool = () => {
  const client = useSuiClient();
  const { coinsMap } = useWeb3();
  const currentAccount = useCurrentAccount();

  return async (
    tokens: ReadonlyArray<Token>,
    treasuryCap: string | null | undefined,
    coinType: string
  ) => {
    if (!currentAccount) throw new Error('No account');

    if (!treasuryCap) throw new Error('No authorization to use this LP coin');

    const mergeTxb = new TransactionBlock();

    const coins = tokens.map(({ type }) =>
      mergeTxb.mergeCoins(
        coinsMap[type].coinObjectId,
        coinsMap[type].objects.slice(1).map((object) => object.coinObjectId)
      )
    );

    const typeArguments = [...tokens.map((token) => token.type), coinType];

    const PRECISION = 18;
    const price = FixedPointMath.toBigNumber(
      FixedPointMath.toBigNumber(tokens[0].value, PRECISION)
        .div(FixedPointMath.toBigNumber(tokens[1].value, PRECISION))
        .toString(),
      PRECISION
    )
      .decimalPlaces(0)
      .toString();

    const clamm = new CLAMM(
      client,
      process.env.CLAMM_PACKAGE_ID!,
      process.env.CLAMM_SUI_TEARS_PACKAGE_ID!
    );

    console.log({
      coins,
      lpCoinTreasuryCap: treasuryCap,
      typeArguments: typeArguments,
      prices: [BigInt(price)],
    });

    const { pool, poolAdmin, lpCoin, txb } = await clamm.newVolatile({
      coins,
      txb: mergeTxb,
      lpCoinTreasuryCap: treasuryCap,
      typeArguments: typeArguments,
      prices: [BigInt(price)],
    });

    txb.transferObjects([poolAdmin, lpCoin], txb.pure(currentAccount.address));

    return clamm.shareVolatilePool({ txb, pool });
  };
};
