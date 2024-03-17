import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ArrowLeftSVG, TimesSVG } from '@/svg';

import { FindPoolForm, FindPoolModalProps } from './find-pool-modal.types';
import SearchButton from './search-button';
import SelectCoins from './select-coins';

const FindPoolModal: FC<FindPoolModalProps> = ({
  closeModal,
  handleSearch,
}) => {
  const form = useForm<FindPoolForm>({
    defaultValues: {
      tokens: [
        { symbol: '', type: '', decimals: 0 },
        { symbol: '', type: '', decimals: 0 },
      ],
    },
  });
  return (
    <FormProvider {...form}>
      <Motion
        display="flex"
        layout
        height="41rem"
        minWidth="22rem"
        maxHeight="90vh"
        maxWidth="25rem"
        overflow="hidden"
        color="onSurface"
        borderRadius="xs"
        bg="lowContainer"
        flexDirection="column"
        boxShadow="0 0 5px #3334"
        transition={{ duration: 0.3 }}
      >
        <Box
          p="m"
          width="100%"
          height="5rem"
          display="grid"
          alignItems="center"
          justifyContent="space-between"
          gridTemplateColumns="2rem auto 2rem"
        >
          <Button variant="text" isIcon onClick={closeModal} mr="-0.5rem">
            <ArrowLeftSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
          </Button>
          <Typography variant="title" size="large">
            Find Pool
          </Typography>
          <Button variant="text" isIcon onClick={closeModal} mr="-0.5rem">
            <TimesSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
          </Button>
          <Box />
        </Box>
        <SelectCoins />
        <Box
          mx="m"
          my="m"
          display="flex"
          justifyContent="center"
          borderRadius="xs"
        >
          <SearchButton handleSearch={handleSearch} />
        </Box>
      </Motion>
    </FormProvider>
  );
};

export default FindPoolModal;
