import {
  Box,
  Button,
  Motion,
  TextField,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ArrowLeftSVG, SearchSVG, TimesSVG } from '@/svg';

import {
  SearchTokenForm,
  SelectTokenModalProps,
  TokenOrigin,
} from './select-token-modal.types';
import SelectTokenBaseTokens from './select-token-modal-base';
import SelectTokenModalBody from './select-token-modal-body';
import SelectTokenFilter from './select-token-modal-filter';

const SelectTokenModal: FC<SelectTokenModalProps> = ({
  simple,
  closeModal,
}) => {
  const [loading, setLoading] = useState(true);
  const formSearchToken = useForm<SearchTokenForm>({
    defaultValues: {
      search: '',
      filter: TokenOrigin.All,
    },
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, Math.random() * 5000);
  }, [formSearchToken]);

  const handleSelectToken = () => {
    closeModal();
  };

  return (
    <Motion
      layout
      width="100%"
      display="flex"
      maxHeight="90vh"
      maxWidth="25rem"
      overflow="hidden"
      color="onSurface"
      borderRadius="1rem"
      bg="onPrimary"
      flexDirection="column"
      boxShadow="0 0 5px #3334"
      transition={{ duration: 0.3 }}
    >
      <Box
        py="m"
        px="m"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button variant="text" isIcon onClick={closeModal} ml="-0.5rem">
          <ArrowLeftSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
        </Button>
        <Typography variant="label" size="large" color="text">
          Select Token
        </Typography>
        <Button variant="text" isIcon onClick={closeModal} mr="-0.5rem">
          <TimesSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
        </Button>
      </Box>
      <Box my="xl" mx="m">
        <TextField
          fontSize="medium"
          placeholder="Sui"
          label="Search token"
          {...formSearchToken.register('search')}
          Prefix={
            <SearchSVG maxWidth="1.2rem" maxHeight="1.2rem" width="100%" />
          }
        />
      </Box>
      {!simple && (
        <>
          <SelectTokenFilter formSearchToken={formSearchToken} />
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
          formSearchToken={formSearchToken}
          handleSelectToken={handleSelectToken}
        />
      </Motion>
    </Motion>
  );
};

export default SelectTokenModal;
