import { useCurrentAccount } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { normalizeSuiAddress } from '@mysten/sui.js/utils';

import { getBytecode } from '@/lib/move-template/coin';
import initMoveByteCodeTemplate from '@/lib/move-template/move-bytecode-template';

import { CREATE_TOKEN_BLACKLIST } from './create-token.data';
import { ICreateTokenForm } from './create-token.types';

export const useCreateToken = () => {
  const currentAccount = useCurrentAccount();

  return async (values: ICreateTokenForm) => {
    const { name, symbol } = values;

    if (
      CREATE_TOKEN_BLACKLIST.includes(name.toUpperCase().trim()) ||
      CREATE_TOKEN_BLACKLIST.includes(symbol.toUpperCase().trim())
    )
      throw new Error('Nice try :)');

    if (!currentAccount) throw new Error('No account');

    await initMoveByteCodeTemplate('/move_bytecode_template_bg.wasm');

    const txb = new TransactionBlock();

    const [upgradeCap] = txb.publish({
      modules: [
        [
          ...getBytecode({
            ...values,
            recipient: currentAccount.address,
          }),
        ],
      ],
      dependencies: [normalizeSuiAddress('0x1'), normalizeSuiAddress('0x2')],
    });

    txb.transferObjects([upgradeCap], txb.pure(currentAccount.address));

    return txb;
  };
};
