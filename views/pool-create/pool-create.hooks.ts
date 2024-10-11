import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { normalizeSuiAddress } from '@mysten/sui/utils';

import { useClammSdk } from '@/hooks/use-clamm-sdk';
import { FixedPointMath } from '@/lib';
import { getLpCoinBytecode } from '@/lib/move-template/lp-coin';
import initMoveByteCodeTemplate from '@/lib/move-template/move-bytecode-template';
import { getCoinOfValue } from '@/utils';

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

    const tx = new Transaction();

    const [upgradeCap] = tx.publish({
      modules: [[...getLpCoinBytecode(info)]],
      dependencies: [normalizeSuiAddress('0x1'), normalizeSuiAddress('0x2')],
    });

    tx.transferObjects([upgradeCap], tx.pure.address(currentAccount.address));

    return tx;
  };
};

export const useCreateStablePool = () => {
  const clamm = useClammSdk();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();

  return async (
    tokens: ReadonlyArray<Token>,
    treasuryCap: string | null | undefined,
    coinType: string
  ): Promise<Transaction> => {
    if (!currentAccount) throw new Error('No account');

    if (!treasuryCap) throw new Error('No authorization to use this LP coin');

    const auxTx = new Transaction();

    const coins = await Promise.all(
      tokens.map(({ type, value }) =>
        getCoinOfValue({
          suiClient,
          tx: auxTx,
          coinValue: value,
          coinType: type,
          account: currentAccount.address,
        })
      )
    );

    const typeArguments = [...tokens.map((token) => token.type), coinType];

    const { pool, poolAdmin, lpCoin, tx } = await clamm.newStable({
      coins,
      tx: auxTx as any,
      lpCoinTreasuryCap: treasuryCap,
      typeArguments: typeArguments,
    });

    tx.transferObjects(
      [poolAdmin, lpCoin],
      tx.pure.address(currentAccount.address)
    );

    return clamm.shareStablePool({ tx, pool }) as unknown as Transaction;
  };
};

export const useCreateVolatilePool = () => {
  const clamm = useClammSdk();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();

  return async (
    tokens: ReadonlyArray<Token>,
    treasuryCap: string | null | undefined,
    lpCoinType: string
  ): Promise<Transaction> => {
    if (!currentAccount) throw new Error('No account');

    if (!treasuryCap) throw new Error('No authorization to use this LP coin');

    const auxTx = new Transaction();

    const coins = await Promise.all(
      tokens.map(({ type, value }) =>
        getCoinOfValue({
          suiClient,
          tx: auxTx,
          coinValue: value,
          coinType: type,
          account: currentAccount.address,
        })
      )
    );
    const typeArguments = [...tokens.map((token) => token.type), lpCoinType];

    const PRECISION = 18;

    const price = BigInt(
      FixedPointMath.toBigNumber(+tokens[0].value / +tokens[1].value, PRECISION)
        .decimalPlaces(0)
        .toFixed(0)
    );

    const { pool, poolAdmin, lpCoin, tx } = await clamm.newVolatile({
      coins,
      tx: auxTx as any,
      lpCoinTreasuryCap: treasuryCap,
      typeArguments: typeArguments,
      prices: [price],
    });

    tx.transferObjects(
      [poolAdmin, lpCoin],
      tx.pure.address(currentAccount.address)
    );

    return clamm.shareVolatilePool({
      tx,
      pool,
    }) as unknown as Transaction;
  };
};
