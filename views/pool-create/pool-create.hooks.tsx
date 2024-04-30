import { useCurrentAccount } from '@mysten/dapp-kit';
import { normalizeSuiAddress } from '@mysten/sui.js/dist/cjs/utils';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import invariant from 'tiny-invariant';

import { PACKAGES } from '@/constants';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks';
import { getLpCoinBytecode } from '@/lib/move-template/lp-coin';
import initMoveByteCodeTemplate from '@/lib/move-template/move-bytecode-template';
import { getSpecificCoinAmount } from '@/utils';

import { GetByteCodeArgs, Token } from './pool-create.types';

export const useCreateLpCoin = () => {
  const currentAccount = useCurrentAccount();

  return async (tokens: ReadonlyArray<Token>, isStable: boolean) => {
    if (!currentAccount) throw new Error('No account');

    const info: GetByteCodeArgs = {
      // TODO get a defualt from Leo and ask the user for one
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

export const useCreatePool = () => {
  const network = useNetwork();
  const { coinsMap } = useWeb3();

  return (
    values: ReadonlyArray<Token>,
    lpCoinType: string,
    lpCoinTreasury: string
  ) => {
    invariant(+values[0].value > 0, 'Cannot add coinAAmount');
    invariant(+values[1].value > 0, 'Cannot add coinBAmount');

    const txb = new TransactionBlock();

    const objectId = PACKAGES[network].DEX;

    const coinAAmount = getSpecificCoinAmount(values[0])(txb, coinsMap);
    const coinBAmount = getSpecificCoinAmount(values[1])(txb, coinsMap);

    txb.moveCall({
      target: `${objectId}::interest_protocol::new_pool`,
      typeArguments: [values[0].type, values[1].type, lpCoinType],
      arguments: [txb.object(lpCoinTreasury), coinAAmount, coinBAmount],
    });
  };
};
