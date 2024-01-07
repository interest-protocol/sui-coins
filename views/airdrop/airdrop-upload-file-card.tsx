import {
  Box,
  Button,
  Theme,
  Typography,
  useTheme,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { FileSVG, TimesSVG } from '@/svg';

import { AirdropUploadFileCardProps, IAirdropForm } from './airdrop.types';

const AirdropUploadFileCard: FC<AirdropUploadFileCardProps> = ({
  name,
  size,
}) => {
  const { colors } = useTheme() as Theme;
  const { setValue } = useFormContext<IAirdropForm>();

  return (
    <Box
      p="m"
      display="flex"
      borderRadius="xs"
      border="1px solid"
      borderColor="outlineVariant"
      justifyContent="space-between"
    >
      <Box display="flex" gap="m">
        <Box
          display="flex"
          color="primary"
          width="2.5rem"
          height="2.5rem"
          alignItems="center"
          borderRadius="full"
          justifyContent="center"
          bg={`${colors.primary}14`}
        >
          <FileSVG width="100%" maxWidth="1.5rem" maxHeight="1.5rem" />
        </Box>
        <Box>
          <Typography variant="body" size="large">
            {name}
          </Typography>
          <Typography variant="body" size="small" opacity="0.48">
            Fil Size {size}MB
          </Typography>
        </Box>
      </Box>
      <Button
        isIcon
        variant="text"
        onClick={() => setValue('airdropList', null)}
      >
        <TimesSVG maxHeight="1rem" maxWidth="1rem" width="1rem" />
      </Button>
    </Box>
  );
};

export default AirdropUploadFileCard;
