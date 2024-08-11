import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { Transaction } from '@mysten/sui/transactions';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import { TokenIcon } from '@/components';
import {
  FAUCET_AMOUNT,
  FAUCET_COINS,
  TREASURY_CAP_MAP,
} from '@/constants/coins';
import { useModal } from '@/hooks/use-modal';
import { useNetwork } from '@/hooks/use-network';
import { useWeb3 } from '@/hooks/use-web3';
import { CoinData } from '@/interface';
import { ChevronDownSVG } from '@/svg';
import {
  showTXSuccessToast,
  signAndExecute,
  throwTXIfNotSuccessful,
} from '@/utils';
import { requestMov } from '@/views/faucet/faucet.utils';

import SelectTokenModal from '../components/select-token-modal';

const MintForm: FC = () => {
  const network = useNetwork();
  const { mutate } = useWeb3();
  const client = useSuiClient();
  const account = useCurrentAccount();
  const currentAccount = useCurrentAccount();
  const { setModal, handleClose } = useModal();
  const signTransaction = useSignTransaction();
  const [selected, setSelected] = useState(FAUCET_COINS[0]);

  const handleMint = async () => {
    try {
      if (!selected) throw new Error('Token not found');
      if (!account || !currentAccount) throw new Error('Not account found');

      const tx = new Transaction();

      if (selected.type === SUI_TYPE_ARG)
        return requestMov(account.address, network);

      tx.moveCall({
        target: `0x2::coin::mint_and_transfer`,
        typeArguments: [selected.type],
        arguments: [
          tx.object(TREASURY_CAP_MAP[selected.type]),
          tx.pure.u64(FAUCET_AMOUNT[selected.type]),
          tx.pure.address(account.address),
        ],
      });

      const txResult = await signAndExecute({
        tx,
        currentAccount,
        suiClient: client,
        signTransaction,
        options: { showEffects: true },
      });

      throwTXIfNotSuccessful(txResult);
      showTXSuccessToast(txResult, network);
    } finally {
      mutate();
    }
  };

  const onSelect = async ({ decimals, symbol, type }: CoinData) => {
    setSelected({ symbol: symbol, type, decimals });
    handleClose();
  };

  const openModal = () =>
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <SelectTokenModal
          simple
          faucet
          onSelect={onSelect}
          closeModal={handleClose}
        />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );

  const onMint = () => {
    toast
      .promise(handleMint(), {
        loading: 'Loading',
        success: `${selected.symbol} minted successfully`,
        error: 'Something went wrong',
      })
      .catch(console.log);
  };

  return (
    <Box
      mx="auto"
      width={['100%', '100%', '100%', '39.75rem']}
      p="xl"
      mb="s"
      display="flex"
      bg="container"
      borderRadius="xs"
      flexDirection="column"
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
            onClick={openModal}
            borderColor="outlineVariant"
            nHover={{ color: 'unset' }}
            PrefixIcon={
              <TokenIcon
                withBg
                network={network}
                type={selected.type}
                symbol={selected.symbol}
              />
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
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button color="surface" variant="filled" onClick={onMint}>
          Mint
        </Button>
      </Box>
    </Box>
  );
};

export default MintForm;
