import {
  Box,
  Button,
  Motion,
  TextField,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SearchSVG, TimesSVG } from '@/svg';

import { SearchNFTForm, SelectNFTModalProps } from './select-nft-modal.types';
import SelectTokenModalBody from './select-nft-modal-body';

const SelectNFTModal: FC<SelectNFTModalProps> = ({ onSelect, closeModal }) => {
  const form = useForm<SearchNFTForm>({
    defaultValues: {
      search: '',
    },
  });

  const handleSelectNFT = (collectionId: string) => {
    onSelect(collectionId);
    closeModal();
  };

  return (
    <FormProvider {...form}>
      <Motion
        layout
        width="25rem"
        display="flex"
        bg="onPrimary"
        height="41rem"
        maxHeight="90vh"
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
              {...form.register('search')}
              fieldProps={{ height: '3.5rem', mb: 'm', borderRadius: 'xs' }}
              Prefix={
                <SearchSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
              }
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
          <SelectTokenModalBody handleSelectNFT={handleSelectNFT} />
        </Motion>
      </Motion>
    </FormProvider>
  );
};

export default SelectNFTModal;
