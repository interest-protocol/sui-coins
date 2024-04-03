import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import PoweredByZkSend from '@/views/components/powered-by-zksend';

import { SendFormProps, ZkSendForm } from './send-form.types';
import SendButton from './send-form-button';
import SendSelectObject from './send-form-select-object';

const SendForm: FC<SendFormProps> = () => {
  const form = useForm<ZkSendForm>();

  return (
    <FormProvider {...form}>
      <Box
        p="xl"
        gap="xl"
        mx="auto"
        width="100%"
        display="flex"
        borderRadius="s"
        px={['2xs', 'xl']}
        maxWidth="39.75rem"
        bg="lowestContainer"
        flexDirection="column"
      >
        <Typography variant="title" size="large" fontSize="5xl">
          Create a link to send
        </Typography>
        <Typography size="large" variant="body" color="outline">
          The funds can only be claim via the link once. You can also reclaim
          the funds if they have not been previously claimed.
        </Typography>
        <SendSelectObject />
        <SendButton />
        <PoweredByZkSend />
      </Box>
    </FormProvider>
  );
};

export default SendForm;
