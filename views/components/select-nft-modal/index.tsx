import {
  Box,
  Button,
  Motion,
  TextField,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { useWeb3 } from '@/hooks/use-web3';
import { SearchSVG, TimesSVG } from '@/svg';

import { SearchNFTForm, SelectNFTModalProps } from './select-nft-modal.types';
import SelectTokenModalBody from './select-nft-modal-body';

const SelectNFTModal: FC<SelectNFTModalProps> = ({ onSelect, closeModal }) => {
  const { isFetchingCoinBalances } = useWeb3(); // TODO: change the logic to NFT

  const { register } = useForm<SearchNFTForm>({
    defaultValues: {
      search: '',
    },
  });

  const handleSelectNFT = (coin: CoinObject) => {
    onSelect(coin);
    closeModal();
  };

  return (
    <Motion
      layout
      width="100%"
      display="flex"
      bg="onPrimary"
      maxHeight="90vh"
      maxWidth="25rem"
      overflow="hidden"
      color="onSurface"
      borderRadius="xs"
      flexDirection="column"
      boxShadow="0 0 5px #3334"
      transition={{ duration: 0.3 }}
    >
      <Box
        p="m"
        display="grid"
        alignItems="center"
        justifyContent="space-between"
        gridTemplateColumns="2rem auto 2rem"
      >
        <Box />
        <Typography variant="title" size="large">
          Select NFT
        </Typography>
        <Button variant="text" isIcon onClick={closeModal} mr="-0.5rem">
          <TimesSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
        </Button>
      </Box>
      <Box mx="xl" my="l" display="flex" gap="3xs" flexDirection="column">
        <Box>
          <TextField
            fontSize="medium"
            label="Search NFT"
            placeholder="NFT Name"
            {...register('search')}
            fieldProps={{ height: '3.5rem', mb: 'm', borderRadius: 'xs' }}
            Prefix={<SearchSVG maxWidth="1rem" maxHeight="1rem" width="100%" />}
          />
        </Box>
      </Box>
      <Motion
        bg="#B6C4FF33"
        overflowY="auto"
        position="relative"
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
      >
        <SelectTokenModalBody
          loading={isFetchingCoinBalances}
          handleSelectNFT={handleSelectNFT}
        />
      </Motion>
    </Motion>
  );
};

export default SelectNFTModal;
