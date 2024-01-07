import {
  Box,
  Button,
  Motion,
  TextField,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SearchSVG, TimesSVG } from '@/svg';

import {
  CoinDataWithBalance,
  SearchTokenForm,
  SelectTokenModalProps,
  TokenOrigin,
} from './select-token-modal.types';
import SelectTokenBaseTokens from './select-token-modal-base';
import SelectTokenModalBody from './select-token-modal-body';
import SelectTokenFilter from './select-token-modal-filter';

const SelectTokenModal: FC<SelectTokenModalProps> = ({
  simple,
  onSelect,
  closeModal,
}) => {
  const [loading, setLoading] = useState(true);
  const { control, register, setValue } = useForm<SearchTokenForm>({
    defaultValues: {
      search: '',
      filter: TokenOrigin.All,
    },
  });

  useEffect(() => {
    setLoading(true);
    // TODO: Fetch token meta data
    setTimeout(() => {
      setLoading(false);
    }, Math.random() * 5000);
  }, []);

  const handleSelectToken = (coin: CoinDataWithBalance) => {
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
      borderRadius="1rem"
      flexDirection="column"
      boxShadow="0 0 5px #3334"
      transition={{ duration: 0.3 }}
    >
      <Box
        py="xl"
        px="xl"
        my="xs"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box />
        <Typography as="p" color="onSurface" size="large" variant="title">
          Select Token
        </Typography>
        <Button variant="text" isIcon onClick={closeModal} mr="-0.5rem">
          <TimesSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
        </Button>
      </Box>
      <Box mx="xs" mt="0.65rem">
        <TextField
          fontSize="medium"
          placeholder="Sui"
          label="Search token"
          opacity="0.6"
          {...register('search')}
          Prefix={
            <SearchSVG maxWidth="1.25rem" maxHeight="1.25rem" width="100%" />
          }
          fieldProps={{
            mb: '1.5rem',
            py: '1.75rem',
            borderRadius: '0.5rem',
          }}
        />
      </Box>
      {!simple && (
        <>
          <SelectTokenFilter control={control} setValue={setValue} />
          <SelectTokenBaseTokens handleSelectToken={handleSelectToken} />
        </>
      )}
      <Motion
        overflowY="auto"
        position="relative"
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
      >
        <SelectTokenModalBody
          loading={loading}
          control={control}
          handleSelectToken={handleSelectToken}
        />
      </Motion>
    </Motion>
  );
};

export default SelectTokenModal;
