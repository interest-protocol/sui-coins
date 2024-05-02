import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { normalizeSuiAddress } from '@mysten/sui.js/utils';
import invariant from 'tiny-invariant';

import { OBJECTS, PACKAGES } from '@/constants';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks';
import { getLpCoinBytecode } from '@/lib/move-template/lp-coin';
import initMoveByteCodeTemplate from '@/lib/move-template/move-bytecode-template';
import { createObjectsParameter, getSafeValue } from '@/utils';

import { GetByteCodeArgs, Token } from './pool-create.types';

export const useCreateLpCoin = () => {
  const currentAccount = useCurrentAccount();

  return async (tokens: ReadonlyArray<Token>, isStable: boolean) => {
    if (!currentAccount) throw new Error('No account');

    const info: GetByteCodeArgs = {
      imageUrl: 'https://www.interestprotocol.com/logo.png',
      description: `AMM Interest Protocol LpCoin for ${tokens.reduce(
        (acc, { symbol }) => `${acc ? `${acc}/` : ''}${symbol.toUpperCase()}`,
        ''
      )}`,
      coinTypes: tokens.map((x) => x.type),
      isStable,
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

export const useCreateAmmPool = () => {
  const network = useNetwork();
  const client = useSuiClient();
  const { coinsMap } = useWeb3();
  const currentAccount = useCurrentAccount();

  return async (
    values: ReadonlyArray<Token>,
    lpCoinType: string,
    lpCoinTreasury: string,
    isStable: boolean
  ) => {
    invariant(currentAccount, 'You must log into your wallet');
    invariant(values && values.length, 'You must select at least 2 coins');

    const [coinX, coinY] = values;

    invariant(coinX.type && coinY.type, 'Coin types not found');
    invariant(+coinX.value && +coinY.value, 'Deposit more than zero coins');

    const txb = new TransactionBlock();

    const objects = OBJECTS[network];
    const packages = PACKAGES[network];

    const walletCoinX = coinsMap[coinX.type];
    const walletCoinY = coinsMap[coinY.type];

    const safeValueX = getSafeValue({
      coinValue: coinX.value,
      coinType: coinX.type,
      decimals: coinX.decimals || 0,
      balance: walletCoinX.balance,
    });

    const safeValueY = getSafeValue({
      coinValue: coinY.value,
      coinType: coinY.type,
      decimals: coinY.decimals || 0,
      balance: walletCoinY.balance,
    });

    const coinXInList = createObjectsParameter({
      txb,
      coinsMap,
      type: coinX.type,
      amount: safeValueX.toString(),
    });

    const coinYInList = createObjectsParameter({
      txb,
      coinsMap,
      type: coinY.type,
      amount: safeValueY.toString(),
    });

    const coin0 = txb.moveCall({
      target: `${packages.UTILS}::utils::handle_coin_vector`,
      typeArguments: [coinX.type],
      arguments: [
        txb.makeMoveVec({ objects: coinXInList }),
        txb.pure(safeValueX.toString()),
      ],
    });

    const coin1 = txb.moveCall({
      target: `${packages.UTILS}::utils::handle_coin_vector`,
      typeArguments: [coinY.type],
      arguments: [
        txb.makeMoveVec({ objects: coinYInList }),
        txb.pure(safeValueY.toString()),
      ],
    });

    const typeArguments = [coinX.type, coinY.type, lpCoinType];

    const [coin0Meta, coin1Meta, lpCoinMeta] = await Promise.all([
      client.getCoinMetadata({ coinType: coinX.type }),
      client.getCoinMetadata({ coinType: coinY.type }),
      client.getCoinMetadata({ coinType: lpCoinType }),
    ]);

    invariant(coin0Meta && coin0Meta.id, 'CoinX does not have a metadata');
    invariant(coin1Meta && coin1Meta.id, 'CoinY does not have a metadata');
    invariant(lpCoinMeta && lpCoinMeta.id, 'lpCoin does not have a metadata');

    const lpCoin = txb.moveCall({
      target: `${packages.DEX}::interest_protocol_amm::new_pool`,
      typeArguments,
      arguments: [
        txb.object(objects.REGISTRY),
        coin0,
        coin1,
        txb.object(lpCoinTreasury),
        txb.object(coin0Meta.id),
        txb.object(coin1Meta.id),
        txb.object(lpCoinMeta.id),
        txb.pure(!isStable),
      ],
    });

    txb.transferObjects([lpCoin], txb.pure.address(currentAccount.address));

    return txb;
  };
};
