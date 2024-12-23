import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { type FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { v4 } from 'uuid';

import type { CoinObject } from '@/components/web3-manager/coins-manager/coins-manager.types';
import { useModal } from '@/hooks/use-modal';
import { useWeb3 } from '@/hooks/use-web3';
import { CheckRoundedSVG, PlusSVG, WalletSVG } from '@/svg';

import SelectTokenModal from '../components/select-token-modal';
import { IMergeForm } from './merge.types';
import MergeField from './merge-field';

const MergeCoinsForm: FC = () => {
  const { coins, setDelay } = useWeb3();
  const currentAccount = useCurrentAccount();
  const { setModal, handleClose } = useModal();
  const { control, setValue } = useFormContext<IMergeForm>();

  const ignored = useWatch({ control, name: 'ignored' });

  useEffect(() => {
    setDelay(0);
  }, []);

  const remove = (type: string) => {
    const ignoredSet = new Set(ignored);

    ignoredSet.add(type);

    setValue('ignored', Array.from(ignoredSet));
  };

  const allCoinsToMerge = coins.filter(({ objectsCount }) => objectsCount > 1);

  const coinsToMerge = allCoinsToMerge.filter(
    ({ type }) => !ignored.includes(type)
  );

  const onSelect = (coin: CoinObject) => {
    if (!(coin.objectsCount > 1))
      return toast.error('This coin do not have objects to merge');

    const ignoredSet = new Set(ignored);

    ignoredSet.delete(coin.type);

    setValue('ignored', Array.from(ignoredSet));
  };

  const openModal = () =>
    setModal(
      <SelectTokenModal simple onSelect={onSelect} closeModal={handleClose} />
    );

  return (
    <Box
      gap="l"
      display="flex"
      overflowY="auto"
      maxHeight="25rem"
      flexDirection="column"
    >
      {coinsToMerge.map((coin) => (
        <MergeField key={v4()} {...coin} remove={remove} />
      ))}
      {allCoinsToMerge.length !== coinsToMerge.length && (
        <Button
          p="s"
          mt="xl"
          gap="m"
          variant="outline"
          onClick={openModal}
          justifyContent="center"
          borderColor="outlineVariant"
          PrefixIcon={
            <PlusSVG maxWidth="1.2rem" maxHeight="1.2rem" width="100%" />
          }
        >
          Add Token
        </Button>
      )}
      {!allCoinsToMerge.length &&
        (currentAccount ? (
          <Box
            gap="l"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <CheckRoundedSVG maxWidth="3rem" maxHeight="3rem" width="100%" />
            <Typography variant="body" size="medium" textAlign="center">
              No coins to merge
            </Typography>
          </Box>
        ) : (
          <Box
            gap="l"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <WalletSVG maxWidth="3rem" maxHeight="3rem" width="100%" />
            <Typography variant="body" size="medium" textAlign="center">
              Please, connect your wallet
            </Typography>
          </Box>
        ))}
    </Box>
  );
};

export default MergeCoinsForm;
