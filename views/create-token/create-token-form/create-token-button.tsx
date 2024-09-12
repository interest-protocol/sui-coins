import { Button } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { normalizeSuiAddress, SUI_TYPE_ARG } from '@mysten/sui/utils';
import { FC } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { Network } from '@/constants';
import { useWeb3 } from '@/hooks/use-web3';
import { getBytecode } from '@/lib/move-template/coin';
import initMoveByteCodeTemplate from '@/lib/move-template/move-bytecode-template';
import {
  showTXSuccessToast,
  signAndExecute,
  throwTXIfNotSuccessful,
  waitForTx,
} from '@/utils';

import { CreateTokenButtonProps } from '../create-token.types';
import { Blacklist } from './blacklist';

const CreateTokenButton: FC<CreateTokenButtonProps> = ({
  getValues,
  handleSubmit,
}) => {
  const [loading, setLoading] = useState(false);

  const suiClient = useSuiClient();
  const { network } = useSuiClientContext();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();
  const { coinsMap, mutate } = useWeb3();

  const createToken = async () => {
    try {
      setLoading(true);

      if (!currentAccount) return;

      const { name, symbol } = getValues();

      if (
        Blacklist.includes(name.toUpperCase().trim()) ||
        Blacklist.includes(symbol.toUpperCase().trim())
      ) {
        throw new Error('Nice try :)');
      }

      await initMoveByteCodeTemplate('/move_bytecode_template_bg.wasm');

      const tx = new Transaction();

      if (!coinsMap[SUI_TYPE_ARG])
        throw new Error("You doesn't have enough SUI on your wallet");

      tx.setGasPayment(
        coinsMap[SUI_TYPE_ARG]?.objects.map(
          ({ coinObjectId, digest, version }) => ({
            objectId: coinObjectId,
            digest: digest!,
            version: version!,
          })
        )
      );

      const [upgradeCap] = tx.publish({
        modules: [
          [
            ...getBytecode({
              ...getValues(),
              recipient: currentAccount.address,
            }),
          ],
        ],
        dependencies: [normalizeSuiAddress('0x1'), normalizeSuiAddress('0x2')],
      });

      tx.transferObjects([upgradeCap], tx.pure.address(currentAccount.address));

      const tx2 = await signAndExecute({
        tx,
        suiClient,
        currentAccount,
        signTransaction,
      });

      throwTXIfNotSuccessful(tx2);

      showTXSuccessToast(tx2, network as Network, 'Coin Generated!');

      await waitForTx({ suiClient, digest: tx2.digest });

      mutate();
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    const loading = toast.loading('Generating new coin...');
    try {
      await createToken();
    } catch (e) {
      toast.error((e as Error).message || 'Something went wrong');
    } finally {
      toast.dismiss(loading);
    }
  };

  return (
    <Button
      py="s"
      px="xl"
      fontSize="s"
      bg="primary"
      type="submit"
      variant="filled"
      color="onPrimary"
      borderRadius="xs"
      fontFamily="Proto"
      onClick={handleSubmit(onSubmit)}
      disabled={!currentAccount || loading}
    >
      Create coin
    </Button>
  );
};

export default CreateTokenButton;
