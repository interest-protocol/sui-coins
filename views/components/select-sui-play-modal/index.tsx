import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { TimesSVG } from '@/svg';

import { SelectSuiPlayModalProps } from './select-sui-play-modal.types';
import SelectTokenModalBody from './select-sui-play-modal-body';

const SelectSuiPlayModal: FC<SelectSuiPlayModalProps> = ({
  onSelect,
  closeModal,
}) => {
  const handleSelectTier = (tier: 'The Exalted' | 'The Mythics' | 'All') => {
    onSelect(tier);
    closeModal();
  };

  return (
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
          Select Soulbound
        </Typography>
        <Button variant="text" isIcon onClick={closeModal} mr="-0.5rem">
          <TimesSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
        </Button>
      </Box>
      <Motion
        bg="#B6C4FF33"
        overflowY="auto"
        position="relative"
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
      >
        <SelectTokenModalBody handleSelectTier={handleSelectTier} />
      </Motion>
    </Motion>
  );
};

export default SelectSuiPlayModal;
