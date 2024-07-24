import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ArrowLeftSVG, ErrorSVG } from '@/svg';

import { SendFormsProps } from '../send-forms.types';
import { ISendTransferForm } from './send-transfer.types';
import SendTransferFormFields from './send-transfer-fields';

const SendTransfer: FC<SendFormsProps> = ({ goBack }) => {
  const form = useForm<ISendTransferForm>({ reValidateMode: 'onChange' });

  return (
    <FormProvider {...form}>
      <Box display="flex" flexDirection="column" gap="4xl">
        <Box
          mx="auto"
          width="100%"
          display="grid"
          maxWidth="36rem"
          alignItems="center"
          gridTemplateColumns="1fr auto 1fr"
        >
          <Button variant="text" isIcon onClick={goBack}>
            <ArrowLeftSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
          </Button>
          <Typography variant="display" size="small" textAlign="center">
            Simple Transfer
          </Typography>
        </Box>
        <Box
          p="3xl"
          pb="s"
          gap="xl"
          mx="auto"
          width="100%"
          display="flex"
          borderRadius="s"
          px={['2xs', 'xl']}
          maxWidth="035rem"
          bg="lowestContainer"
          flexDirection="column"
        >
          <Typography mx="auto" size="large" variant="title" textAlign="center">
            Transfer items to an address
          </Typography>
          <Box
            p="l"
            gap="l"
            display="flex"
            borderRadius="s"
            border="1px solid"
            borderColor="warning"
          >
            <Box color="warning">
              <ErrorSVG maxHeight="3rem" maxWidth="3rem" width="100%" />
            </Box>
            <Box display="flex" gap="xs" flexDirection="column">
              <Typography size="large" variant="body" color="error">
                Caution
              </Typography>
              <Typography size="large" variant="body" color="outline">
                This transfer will not appear on the history tab.
              </Typography>
            </Box>
          </Box>
          <SendTransferFormFields />
        </Box>
      </Box>
    </FormProvider>
  );
};

export default SendTransfer;
