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
    width="25rem"
    display="flex"
    maxWidth="100%"
    borderRadius="xs"
    bg="lowContainer"
    height="18.063rem"
    alignItems="center"
    flexDirection="column"
    justifyContent="center"
    ml={['-1rem', 0, 0, 0]}
  >
    <Box
      pt="3xl"
      px="2xl"
      display="flex"
      minWidth="100%"
      color="onSurface"
      position="relative"
      alignItems="center"
      justifyContent="flex-end"
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
      <Button variant="text" isIcon onClick={onClose} mr="-0.5rem">
        <TimesSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
      </Button>
    </Box>
    <Box
      mt="l"
      p="m"
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
        color="onSurface"
        width="fit-content"
        borderRadius="50%"
        bg="highContainer"
        alignItems="center"
        boxShadow="#FFFFFF1B 0px 0px 2px 0px, #FFFFFF1B 0px 0px 0px 2px"
      >
        <PlusSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
      </Box>
      <Typography
        mt="s"
        p="2xs"
        size="medium"
        lineHeight="m"
        variant="body"
        color="onSurface"
        textAlign="center"
      >
        {description}
      </Typography>
    </Box>
    <Box width="100%" borderTop="1px solid" borderColor="outlineVariant" />
    <Box
      p="xl"
      display="flex"
      minWidth="100%"
      flexDirection="row"
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
