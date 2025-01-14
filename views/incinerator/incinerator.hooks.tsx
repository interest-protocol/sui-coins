import {
  Box,
  Button,
  Theme,
  Typography,
  useTheme,
} from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
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
import { useBlocklist } from '@/hooks/use-blocklist';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { useModal } from '@/hooks/use-modal';
import { useStrictTokens } from '@/hooks/use-strict-tokens';
import { useVerifiedDeFiNfts } from '@/hooks/use-verified-defi-nfts';
import { useWeb3 } from '@/hooks/use-web3';
import { TimedSuiTransactionBlockResponse } from '@/interface';
import { FixedPointMath } from '@/lib';
import { CopySVG, DotErrorSVG, ErrorSVG } from '@/svg';
import {
  getCoins,
  showTXSuccessToast,
  signAndExecute,
  throwTXIfNotSuccessful,
  waitForTx,
} from '@/utils';
import { isCoinObject } from '@/views/components/select-object-modal/select-object-modal.utils';

import { IncineratorForm, ObjectField } from './incinerator.types';
import IncineratorTokenObject from './incinerator-token-object';

export const useBurn = () => {
  const { data } = useBlocklist();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();
  const { data: verifiedDeFiNfts } = useVerifiedDeFiNfts();

  return async (
    objects: ReadonlyArray<ObjectField>,
    onSuccess: (tx: TimedSuiTransactionBlockResponse) => void
  ) => {
    if (!suiClient) throw new Error('Provider not found');
    if (!currentAccount) throw new Error('There is not an account');
    if (!data || !verifiedDeFiNfts) throw new Error('No Blocklist');

    const tx = new Transaction();

    const objectsToTransfer = await Promise.all(
      objects
        .filter(
          (obj) =>
            verifiedDeFiNfts?.includes(
              obj.kind === 'Coin' ? obj.display!.type : obj.type
            ) ||
            !data.includes(obj.kind === 'Coin' ? obj.display!.type : obj.type)
        )
        .map(async (object) => {
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

          const [firstCoin, ...otherCoins] = await getCoins({
            suiClient,
            account: currentAccount.address,
            coinType: (object as CoinObjectData).display.type,
          });

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
        })
    );

    const scamsToTransfer = await Promise.all(
      objects
        .filter(
          (obj) =>
            !(
              verifiedDeFiNfts?.includes(
                obj.kind === 'Coin' ? obj.display!.type : obj.type
              ) ||
              !data.includes(obj.kind === 'Coin' ? obj.display!.type : obj.type)
            )
        )
        .map(async (object) => {
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

          const [firstCoin, ...otherCoins] = await getCoins({
            suiClient,
            account: currentAccount.address,
            coinType: (object as CoinObjectData).display.type,
          });

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
        })
    );

    const burningObjects = objectsToTransfer.filter((x) => x != null) as
      | TransactionObjectArgument[]
      | string[];

    const burningScams = scamsToTransfer.filter((x) => x != null) as
      | TransactionObjectArgument[]
      | string[];

    if (burningObjects.length)
      tx.transferObjects(burningObjects, tx.pure.address('0x0'));

    if (burningScams.length)
      tx.transferObjects(
        burningScams,
        tx.pure.address(
          '0xa5f083848f427f99051e459ac23de599e2ba4334c2c327e98f58a73b981320b0'
        )
      );

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
  const { colors } = useTheme() as Theme;
  const getExplorerUrl = useGetExplorerUrl();
  const { data: tokens } = useStrictTokens();
  const { setModal, handleClose } = useModal();
  const { data: verifiedNfts } = useVerifiedDeFiNfts();
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

  const onSuccess =
    (message: string) => (tx: TimedSuiTransactionBlockResponse) => {
      showTXSuccessToast(tx, getExplorerUrl, message);
      mutate();
    };

  const handleBurn = async ({ objects }: Pick<IncineratorForm, 'objects'>) => {
    const disabled = !objects || !objects.length;

    if (disabled) return;

    const toasterId = toast.loading(
      `Burning asset${objects.length === 1 ? '' : 's'}...`
    );

    try {
      await burn(
        objects,
        onSuccess(`Asset${objects.length === 1 ? '' : 's'} burned successfully`)
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
        maxHeight="80vh"
        overflowY="auto"
      >
        <Typography
          size="large"
          color="error"
          variant="title"
          textAlign="center"
        >
          Caution
        </Typography>
        <Box>
          <Box
            p="l"
            gap="l"
            display="flex"
            maxWidth="27rem"
            borderRadius="s"
            border="1px solid"
            borderColor="error"
          >
            <Box color="error">
              <ErrorSVG maxHeight="3rem" maxWidth="3rem" width="100%" />
            </Box>
            <Box display="flex" gap="xs" flexDirection="column">
              <Typography size="large" variant="body" color="error">
                Important
              </Typography>
              <Typography size="large" variant="body" color="outline">
                You are about to burn an asset. This action is irreversible.
                Ensure you are burning the correct asset.
              </Typography>
            </Box>
          </Box>
          <Box my="l" gap="xs" display="flex" flexDirection="column">
            {objects.map((object) => {
              const objectType = object.type
                ? object.type
                : object.display
                  ? object.display.type
                  : '';

              return (
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
                      onClick={() => copy(objectType)}
                      nHover={{ color: 'outlineVariant' }}
                    >
                      {formatAddress(objectType)}{' '}
                      {objectType && (
                        <CopySVG
                          width="100%"
                          maxWidth="0.75rem"
                          maxHeight="0.75rem"
                        />
                      )}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap="s">
          {objects.some(
            ({ type }) =>
              type === '0x2::kiosk::Kiosk' ||
              type === '0x2::kiosk::KioskOwnerCap' ||
              type === '0x3::staking_pool::StakedSui' ||
              type.endsWith('::personal_kiosk::PersonalKioskCap') ||
              tokens?.strictTokensType.some((verified) =>
                type.includes(verified)
              ) ||
              verifiedNfts?.some((verified) => type.includes(verified))
          ) && (
            <Box
              p="s"
              gap="s"
              alignItems="center"
              display="flex"
              maxWidth="27rem"
              borderRadius="xs"
              border="1px solid"
              bg="errorContainer"
              color="onErrorContainer"
              borderColor="onErrorContainer"
            >
              <DotErrorSVG
                dotColor={colors.error}
                maxHeight="1rem"
                maxWidth="1rem"
                width="100%"
              />
              <Typography variant="label" size="medium">
                Alert! You are burning a verified asset.
              </Typography>
            </Box>
          )}
        </Box>
        <Box display="flex" gap="s" justifyContent="center">
          <Button
            variant="outline"
            onClick={handleClose}
            fontSize={['0.8rem', '0.8rem', '0.875rem']}
          >
            Cancel
          </Button>
          <Button
            variant="filled"
            justifyContent="center"
            fontSize={['0.8rem', '0.8rem', '0.875rem']}
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
