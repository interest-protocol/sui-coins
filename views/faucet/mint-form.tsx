import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import { CONTROLLERS_MAP } from '@/constants';
import { COINS } from '@/constants/coins';
import { TOKEN_SYMBOL } from '@/constants/coins';
import { MINT_MODULE_NAME_MAP, PACKAGES } from '@/constants/packages';
import { useNetwork } from '@/context/network';
import { useUserMintEpoch, useWeb3 } from '@/hooks';
import { useModal } from '@/hooks/use-modal';
import { useSuiSystemState } from '@/hooks/use-sui-system-state';
import { CoinData } from '@/interface';
import { TOKEN_ICONS } from '@/lib';
import { ChevronDownSVG } from '@/svg';
import { showTXSuccessToast, throwTXIfNotSuccessful } from '@/utils';
import { requestMov } from '@/views/faucet/faucet.utils';

import SelectTokenModal from '../components/select-token-modal';

const MintForm: FC = () => {
  const [selected, setSelected] = useState(COINS[0]);
  const network = useNetwork();
  const { account, mutate } = useWeb3();
  const { setModal, handleClose } = useModal();
  const client = useSuiClient();
  const signTransactionBlock = useSignTransactionBlock();
  const currentAccount = useCurrentAccount();

  const SelectedIcon = TOKEN_ICONS[network][selected.symbol];

  const { data } = useSuiSystemState();

  const lastMintEpoch = useUserMintEpoch();

  const isSameEpoch =
    !!Number(data?.epoch) &&
    (lastMintEpoch as Record<TOKEN_SYMBOL, string>)[selected.symbol] ===
      data?.epoch;

  const handleMint = async () => {
    try {
      if (!selected) throw new Error('Token not found');
      if (!account || !currentAccount) throw new Error('Not account found');

      const transactionBlock = new TransactionBlock();

      if (selected.type === SUI_TYPE_ARG) return requestMov(account, network);

      const minted_coin = transactionBlock.moveCall({
        target: `${PACKAGES[network].COINS}::${
          MINT_MODULE_NAME_MAP[selected.type]
        }::mint`,
        arguments: [transactionBlock.object(CONTROLLERS_MAP[selected.type])],
      });

      transactionBlock.transferObjects([minted_coin], account);

      const { transactionBlockBytes, signature } =
        await signTransactionBlock.mutateAsync({
          transactionBlock,
          account: currentAccount,
        });

      const tx = await client.executeTransactionBlock({
        transactionBlock: transactionBlockBytes,
        signature,
        options: {
          showEffects: true,
          showEvents: false,
          showInput: false,
          showBalanceChanges: false,
          showObjectChanges: false,
        },
      });

      throwTXIfNotSuccessful(tx);
      await showTXSuccessToast(tx, network);
    } finally {
      await mutate();
    }
  };

  const onSelect = async ({ decimals, symbol, type }: CoinData) => {
    setSelected({ symbol: symbol as TOKEN_SYMBOL, type, decimals });
    handleClose();
  };

  const openModal = () =>
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <SelectTokenModal closeModal={handleClose} onSelect={onSelect} />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );

  const onMint = () => {
    toast.promise(handleMint(), {
      loading: 'Loading',
      success: `${selected.symbol} minted successfully`,
      error: 'You can only mint once every 24 hours',
    });
  };

  return (
    <Box
      mb="s"
      p="xl"
      mx="auto"
      display="flex"
      borderRadius="xs"
      bg="container"
      flexDirection="column"
      width={['100%', '100%', '100%', '39.75rem']}
    >
      <Typography
        size="large"
        fontSize="5xl"
        variant="title"
        fontWeight="500"
        color="onSurface"
      >
        I would like to mint...
      </Typography>
      <Box my="6xl" display="flex" gap="s" flexDirection="column">
        <Typography variant="body" size="large" color="onSurface">
          Choose coin to mint
        </Typography>
        <Box position="relative" display="flex" flexDirection="column">
          <Button
            p="xs"
            variant="outline"
            borderRadius="xs"
            borderColor="outlineVariant"
            onClick={openModal}
            nHover={{
              color: 'unset',
            }}
            PrefixIcon={
              <Box
                display="flex"
                bg="onSurface"
                width="2.5rem"
                height="2rem"
                borderRadius="xs"
                alignItems="center"
                justifyContent="center"
              >
                <SelectedIcon
                  width="100%"
                  maxWidth="1.5rem"
                  maxHeight="1.25rem"
                />
              </Box>
            }
            SuffixIcon={
              <Box
                display="flex"
                color="onSurface"
                alignItems="center"
                justifyContent="center"
              >
                <ChevronDownSVG
                  width="100%"
                  maxWidth="1.5rem"
                  maxHeight="1.5rem"
                />
              </Box>
            }
          >
            <Typography
              size="large"
              width="100%"
              variant="body"
              color="onSurface"
            >
              {selected.symbol}
            </Typography>
          </Button>
          {isSameEpoch && (
            <Typography variant="body" size="small" color="error" mt="xs">
              You cannot mint more {selected.symbol}
            </Typography>
          )}
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button
          disabled={isSameEpoch}
          variant="filled"
          onClick={onMint}
          color="surface"
        >
          Mint
        </Button>
      </Box>
    </Box>
  );
};

export default MintForm;
