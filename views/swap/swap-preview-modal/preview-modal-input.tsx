import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { SUISVG } from '@/svg';

import PreviewModalHeader from './preview-modal-header';
import { PreviewModalInputProps } from './swap-preview-modal.types';
//import Token from './token';

const PreviewModalInput: FC<PreviewModalInputProps> = ({
  label,
  alternativeText,
  value,
}) => {
  //const { control, register, setValue, getValues } = useFormContext<SwapForm>();
  return (
    <Box p="m" pt="2xs">
      <PreviewModalHeader
        label={label}
        alternativeText={alternativeText}
        value={value}
      />
      <Box
        p="s"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        bg="#F8F9FD"
        borderRadius="xs"
        mt="s"
        height="4rem"
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box
            bg="onSurface"
            color="onPrimary"
            width="2.5rem"
            height="2.5rem"
            borderRadius="xs"
            alignItems="center"
            display="inline-flex"
            justifyContent="center"
          >
            <SUISVG maxWidth="2rem" maxHeight="2rem" width="100%" />
          </Box>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            flexDirection="column"
            mx="m"
          >
            <Typography variant="body" size="large">
              SUI
            </Typography>
            <Typography variant="body" size="small" color="outline">
              Symbol
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          flexDirection="column"
        >
          <Typography variant="title" size="large">
            0
          </Typography>
          <Typography variant="body" size="small" color="outline">
            {`$${value} USD`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewModalInput;
