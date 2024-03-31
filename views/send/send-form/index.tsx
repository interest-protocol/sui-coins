import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ZkSendForm } from './send-form.types';
import SendButton from './send-form-button';
import SendSelectObject from './send-form-select-object';

const SendForm: FC = () => {
  const form = useForm<ZkSendForm>();

  return (
    <FormProvider {...form}>
      <Box
        p="4xl"
        gap="xl"
        mx="auto"
        width="100%"
        display="flex"
        borderRadius="s"
        maxWidth="39.75rem"
        bg="lowestContainer"
        flexDirection="column"
        px={['2xs', 'xl', 'xl', '7xl']}
      >
        <Typography variant="title" size="large" textAlign="center">
          Create link
        </Typography>
        <Typography
          size="large"
          variant="body"
          color="outline"
          textAlign="center"
        >
          The funds can only be claim via the link once. You can also reclaim
          the funds if they have not been previously claimed.
        </Typography>
        <SendSelectObject />
        <SendButton />
      </Box>
    </FormProvider>
  );
};

export default SendForm;
