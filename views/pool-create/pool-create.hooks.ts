import { CLAMM, PRECISION } from '@interest-protocol/clamm';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/dist/cjs/transactions';

import { useWeb3 } from '@/hooks/use-web3';

import { Token } from './pool-create.types';
import { getLpCoin } from './pool-create.utils';

export const useCreateStablePool = () => {
  const { coinsMap } = useWeb3();
  const currentAccount = useCurrentAccount();

  return async (tokens: ReadonlyArray<Token>) => {
    if (!currentAccount) throw new Error('No account');

    const { treasuryCap, coinType } = await getLpCoin(
      tokens,
      currentAccount.address
    );

    if (!treasuryCap) throw new Error('No authorization to use this LP coin');

    const mergeTxb = new TransactionBlock();

    const coins = tokens.map(({ type }) =>
      mergeTxb.mergeCoins(
        coinsMap[type].coinObjectId,
        coinsMap[type].objects.slice(1).map((object) => object.coinObjectId)
      )
    );

    const typeArguments = [...tokens.map((token) => token.type), coinType];

    const { pool, poolAdmin, lpCoin, txb } = await CLAMM.newStable({
      coins,
      txb: mergeTxb,
      lpCoinTreasuryCap: treasuryCap,
      typeArguments: typeArguments,
    });

    txb.transferObjects([poolAdmin, lpCoin], txb.pure(currentAccount.address));

    return CLAMM.shareStablePool({ txb, pool });
  };
};

export const useCreateVolatilePool = () => {
  const { coinsMap } = useWeb3();
  const currentAccount = useCurrentAccount();

  return async (tokens: ReadonlyArray<Token>) => {
    if (!currentAccount) throw new Error('No account');

    const { treasuryCap, coinType } = await getLpCoin(
      tokens,
      currentAccount.address
    );

    if (!treasuryCap) throw new Error('No authorization to use this LP coin');

    const mergeTxb = new TransactionBlock();

    const coins = tokens.map(({ type }) =>
      mergeTxb.mergeCoins(
        coinsMap[type].coinObjectId,
        coinsMap[type].objects.slice(1).map((object) => object.coinObjectId)
      )
    );

    const typeArguments = [...tokens.map((token) => token.type), coinType];

    const price = BigInt(+tokens[0].value / +tokens[1].value);

    const { pool, poolAdmin, lpCoin, txb } = await CLAMM.newVolatile({
      coins,
      txb: mergeTxb,
      lpCoinTreasuryCap: treasuryCap,
      typeArguments: typeArguments,
      prices: [price * PRECISION],
    });

    txb.transferObjects([poolAdmin, lpCoin], txb.pure(currentAccount.address));

    return CLAMM.shareVolatilePool({ txb, pool });
  };
};
