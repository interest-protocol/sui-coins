import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { PlusSVG, TimesSVG } from '@/svg';

import { FindPoolDialogProps } from './find-pool-dialog.types';

const FindPoolDialog: FC<FindPoolDialogProps> = ({
  title,
  description,
  onClose,
  onCreatePool,
}) => (
  <Box
    p="m"
    width="25rem"
    maxWidth="90%"
    borderRadius="xs"
    alignItems="center"
    display="inline-flex"
    flexDirection="column"
    justifyContent="center"
    boxShadow="dropShadow.2xl"
    backgroundColor="lowestContainer"
  >
    <Box
      display="flex"
      minWidth="100%"
      color="onSurface"
      position="relative"
      alignItems="center"
      justifyContent="flex-end"
      onClick={onClose}
    >
      <Typography
        flex="1"
        size="large"
        variant="title"
        color="onSurface"
        textAlign="center"
      >
        {title}
      </Typography>
      <TimesSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
    </Box>
    <Box
      pt="xl"
      gap="m"
      display="flex"
      maxWidth="22rem"
      minWidth="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Box
        p="s"
        display="flex"
        width="fit-content"
        borderRadius="50%"
        alignItems="center"
        color="onSurface"
        backgroundColor="highContainer"
      >
        <PlusSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
      </Box>
      <Typography
        size="medium"
        lineHeight="m"
        variant="body"
        color="onSurface"
        textAlign="center"
      >
        {description}
      </Typography>
    </Box>
    <Box
      pt="xl"
      mt="xl"
      display="flex"
      minWidth="100%"
      flexDirection="row"
      borderTop="1px solid"
      borderColor="outlineVariant"
      justifyContent="space-between"
    >
      <Button
        flex="1"
        marginRight="s"
        variant="outline"
        color="onSurface"
        borderRadius="xs"
        justifyContent="center"
        borderColor="outlineVariant"
        onClick={onClose}
      >
        Close
      </Button>
      <Button
        flex="3"
        variant="filled"
        borderRadius="xs"
        justifyContent="center"
        onClick={onCreatePool}
      >
        Create Pool
      </Button>
    </Box>
  </Box>
);

export default FindPoolDialog;
