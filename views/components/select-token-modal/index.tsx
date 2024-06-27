import {
  Box,
  Button,
  Motion,
  TextField,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { CoinObject } from '@/components/web3-manager/coins-manager/coins-manager.types';
import { SearchSVG, TimesSVG } from '@/svg';

import FavoriteTokens from './favorite-tokens';
import {
  SearchTokenForm,
  SelectTokenModalProps,
  TokenOrigin,
} from './select-token-modal.types';
import SelectTokenModalBody from './select-token-modal-body';
import SelectTokenFilter from './select-token-modal-filter';

const SelectTokenModal: FC<SelectTokenModalProps> = ({
  faucet,
  simple,
  onSelect,
  closeModal,
}) => {
  const { control, register, setValue } = useForm<SearchTokenForm>({
    defaultValues: {
      search: '',
      filter: simple ? TokenOrigin.Wallet : TokenOrigin.Strict,
    },
  });

  const handleSelectToken = (coin: CoinObject) => {
    onSelect(coin);
    closeModal();
  };

  return (
    <Motion
      layout
      display="flex"
      bg="container"
      height="41rem"
      maxHeight="90vh"
      overflow="hidden"
      color="onSurface"
      borderRadius="xs"
      flexDirection="column"
      boxShadow="0 0 5px #3334"
      width={['100%', '25rem']}
      maxWidth={['25rem', 'unset']}
      transition={{ duration: 0.3 }}
    >
      <Box
        py="s"
        px="l"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="title" size="large" fontSize="xl">
          Select Token
        </Typography>
        <Button variant="text" isIcon onClick={closeModal} mr="-0.5rem">
          <TimesSVG maxWidth="0.8rem" maxHeight="0.8rem" width="100%" />
        </Button>
      </Box>
      <Box mx="xl" display="flex" gap="3xs" flexDirection="column">
        <Box>
          <TextField
            fontSize="medium"
            {...register('search')}
            placeholder="Search token"
            nPlaceholder={{ opacity: 0.7 }}
            fieldProps={{ height: '3.5rem', mb: 'm', borderRadius: 'xs' }}
            Prefix={<SearchSVG maxWidth="1rem" maxHeight="1rem" width="100%" />}
          />
        </Box>
        {!simple && (
          <>
            <FavoriteTokens onSelectToken={handleSelectToken} />
            <SelectTokenFilter control={control} setValue={setValue} />
          </>
        )}
      </Box>
      <Box
        flex="1"
        display="flex"
        overflowY="auto"
        bg="lowContainer"
        flexDirection="column"
      >
        <SelectTokenModalBody
          faucet={faucet}
          control={control}
          handleSelectToken={handleSelectToken}
        />
      </Box>
    </Motion>
  );
};

export default SelectTokenModal;
