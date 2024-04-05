import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ArrowLeftSVG, ErrorSVG, TimesSVG } from '@/svg';
import PoweredByZkSend from '@/views/components/powered-by-zksend';

import { LOCAL_STORAGE_TOP_KEY } from '../../send.data';
import { SendFormsProps } from '../send-forms.types';
import { ISendBulkForm } from './send-bulk.types';
import SendBulkFormButton from './send-bulk-button';
import SendBulkSummary from './send-bulk-summary';
import SendInputQuantity from './send-input-quantity';
import SendSelectObject from './send-select-object';

const SendBulk: FC<SendFormsProps> = ({ goBack }) => {
  const form = useForm<ISendBulkForm>();

  const [isTipHidden, setTipHidden] = useState(true);

  useEffect(() => {
    setTipHidden(
      Boolean(localStorage.getItem(LOCAL_STORAGE_TOP_KEY) as 'true' | 'false')
    );
  }, []);

  const onClose = () => {
    setTipHidden(true);
    localStorage.setItem(LOCAL_STORAGE_TOP_KEY, JSON.stringify(true));
  };

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
            Bulk Link
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
          maxWidth="35rem"
          px={['2xs', 'xl']}
          bg="lowestContainer"
          flexDirection="column"
        >
          <Typography
            mx="auto"
            size="large"
            variant="title"
            maxWidth="17rem"
            textAlign="center"
          >
            Create multiple links
          </Typography>
          {!isTipHidden && (
            <Box
              p="l"
              gap="l"
              display="flex"
              borderRadius="s"
              border="1px solid"
              borderColor="error"
            >
              <Box color="error">
                <ErrorSVG maxHeight="3rem" maxWidth="3rem" width="100%" />
              </Box>
              <Box display="flex" gap="xs" flexDirection="column">
                <Typography size="large" variant="body" color="error">
                  Important
                </Typography>
                <Typography size="large" variant="body" color="outline">
                  The funds can only be claim via the link once. You can also
                  reclaim the funds if they have not been previously claimed.
                </Typography>
              </Box>
              <Box
                width="2rem"
                height="2rem"
                color="error"
                display="flex"
                cursor="pointer"
                borderRadius="xs"
                onClick={onClose}
                alignItems="center"
                justifyContent="center"
              >
                <TimesSVG maxHeight="1.5rem" maxWidth="1.5rem" width="100%" />
              </Box>
            </Box>
          )}
          <SendSelectObject />
          <SendInputQuantity />
          <SendBulkSummary />
          <SendBulkFormButton />
          <PoweredByZkSend />
        </Box>
      </Box>
    </FormProvider>
  );
};

export default SendBulk;
