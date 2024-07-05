import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { TransactionObjectArgument } from '@mysten/sui/transactions';
import { formatAddress } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { v4 } from 'uuid';

import {
  CoinObjectData,
  ObjectData,
} from '@/components/web3-manager/all-objects-manager/all-objects.types';
import { Network } from '@/constants';
import { useModal } from '@/hooks/use-modal';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { CopySVG } from '@/svg';
import {
  showTXSuccessToast,
  signAndExecute,
  throwTXIfNotSuccessful,
  waitForTx,
} from '@/utils';
import { isCoinObject } from '@/views/components/select-object-modal/select-object-modal.utils';

import { IncineratorForm, ObjectField } from './incinerator.types';
import IncineratorTokenObject from './incinerator-token-object';

const useBurn = () => {
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();

  return async (
    objects: ReadonlyArray<ObjectField>,
    onSuccess: (tx: SuiTransactionBlockResponse) => void
  ) => {
    if (!suiClient) throw new Error('Provider not found');
    if (!currentAccount) throw new Error('There is not an account');

    const tx = new Transaction();

    const objectsToTransfer = objects.map((object) => {
      if (!isCoinObject(object as ObjectData)) return object.objectId;

      const objectBalance = BigNumber(object.display?.balance || '0');

      if (objectBalance.isZero()) {
        tx.moveCall({
          target: '0x2::coin::destroy_zero',
          arguments: [tx.object(object.objectId)],
          typeArguments: [object.display?.type || ''],
        });
        return null;
      }

      const amount = FixedPointMath.toBigNumber(
        object.value,
        Number(object.display!.decimals!)
      );

      if (amount.isZero() && !objectBalance.isZero()) return null;

      const [firstCoin, ...otherCoins] = (object as CoinObjectData).display
        .objects;

      const firstCoinObject = tx.object(firstCoin.coinObjectId);

      if (otherCoins.length)
        tx.mergeCoins(
          firstCoinObject,
          otherCoins.map((coin) => coin.coinObjectId)
        );

      if (amount.gte(object.display!.balance)) return firstCoinObject;

      const [splittedCoin] = tx.splitCoins(firstCoinObject, [
        tx.pure.u64(amount.decimalPlaces(0).toString()),
      ]);

      return splittedCoin;
    });

    const toTransfer = objectsToTransfer.filter((x) => x != null) as
      | TransactionObjectArgument[]
      | string[];

    if (toTransfer.length)
      tx.transferObjects(toTransfer, tx.pure.address('0x0'));

    const tx2 = await signAndExecute({
      tx,
      suiClient,
      currentAccount,
      signTransaction,
    });

    throwTXIfNotSuccessful(tx2);

    await waitForTx({ suiClient, digest: tx2.digest });

    onSuccess(tx2);
  };
};

export const useOnBurn = () => {
  const burn = useBurn();
  const { setDelay, mutate } = useWeb3();
  const { network } = useSuiClientContext();
  const { setModal, handleClose } = useModal();
  const { setValue } = useFormContext<IncineratorForm>();

  const refresh = () => {
    mutate();
    setDelay(10000);
    setValue('reset', true);
  };

  const copy = (type: string) => {
    navigator.clipboard.writeText(type);

    toast('Link copied to clipboard');
  };

  const onSuccess = (tx: SuiTransactionBlockResponse) => {
    showTXSuccessToast(tx, network as Network);
    mutate();
  };

  const handleBurn = async ({ objects }: Pick<IncineratorForm, 'objects'>) => {
    const disabled = !objects || !objects.length;

    if (disabled) return;

    const toasterId = toast.loading(
      `Burning asset${objects.length === 1 ? '' : 's'}...`
    );

    try {
      await burn(objects, onSuccess);
      toast.success(
        `Asset${objects.length === 1 ? '' : 's'} burned successfully`
      );
    } catch (e) {
      toast.error((e as any).message ?? 'Something went wrong');
    } finally {
      refresh();
      toast.dismiss(toasterId);
    }
  };

  return ({ objects }: Pick<IncineratorForm, 'objects'>) =>
    objects.length &&
    setModal(
      <Box
        py="l"
        px="xl"
        gap="xl"
        display="flex"
        borderRadius="m"
        bg="lowestContainer"
        flexDirection="column"
      >
        <Typography variant="title" size="large" textAlign="center">
          Caution
        </Typography>
        <Box>
          <Typography variant="body" size="medium" maxWidth="27rem">
            This is irreversible. Please double-check the types of assets you
            are burning.
          </Typography>
          <Box
            my="l"
            gap="xs"
            display="flex"
            overflowY="auto"
            maxHeight="20rem"
            flexDirection="column"
          >
            {objects.map((object) => (
              <Box
                p="xs"
                pr="xl"
                key={v4()}
                display="flex"
                bg="lowContainer"
                borderRadius="xs"
                alignItems="center"
                nHover={{ bg: 'container' }}
                justifyContent="space-between"
              >
                <IncineratorTokenObject object={object} />
                <Box textAlign="right">
                  <Typography size="medium" variant="body">
                    {object.value}
                  </Typography>
                  <Typography
                    size="small"
                    variant="body"
                    color="outline"
                    cursor="pointer"
                    onClick={() => copy(object.type)}
                    nHover={{ color: 'outlineVariant' }}
                  >
                    {formatAddress(object.type)}{' '}
                    <CopySVG
                      width="100%"
                      maxWidth="0.75rem"
                      maxHeight="0.75rem"
                    />
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box display="flex" gap="s" justifyContent="center">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="filled"
            justifyContent="center"
            onClick={() => {
              handleClose();
              handleBurn({ objects });
            }}
          >
            Continue anyway
          </Button>
        </Box>
      </Box>
    );
};
