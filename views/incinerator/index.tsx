import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Layout from '@/components/layout';

import { IncineratorForm } from './incinerator.types';
import IncineratorFields from './incinerator-fields';

const Incinerator: FC = () => {
  const form = useForm<IncineratorForm>();

  return (
    <Layout title="Incinerator">
      <FormProvider {...form}>
        <Box display="flex" flexDirection="column" gap="4xl">
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
            <Typography
              mx="auto"
              size="large"
              variant="title"
              maxWidth="17rem"
              textAlign="center"
            >
              Burn your assets
            </Typography>
            <Typography
              mx="auto"
              size="large"
              variant="body"
              maxWidth="27rem"
              textAlign="center"
            >
              Burn your assets, sending to{' '}
              <Typography variant="label" size="large" as="code">
                0x0
              </Typography>{' '}
              (dead) address.
            </Typography>
            <IncineratorFields />
          </Box>
        </Box>
      </FormProvider>
    </Layout>
  );
};

export default Incinerator;
