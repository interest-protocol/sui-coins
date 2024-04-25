import { Box, TextField, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Layout from '@/components/layout';
import { SearchSVG } from '@/svg';

import { IncineratorForm } from './incinerator.types';

const Incinerator: FC = () => {
  const form = useForm<IncineratorForm>();

  return (
    <Layout>
      <FormProvider {...form}>
        <Box
          mt="3xl"
          gap="xl"
          mx="auto"
          width="100%"
          display="flex"
          borderRadius="s"
          maxWidth="51rem"
          bg="lowestContainer"
          flexDirection="column"
        >
          <Box
            gap="l"
            p="xl"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection={['column', 'column', 'column', 'row']}
          >
            <Typography
              variant="title"
              size="large"
              fontSize="5xl"
              fontWeight="700"
            >
              Incinerator
            </Typography>
            <Box width={['100%', '100%', '100%', '25rem']}>
              <TextField
                fontSize="medium"
                placeholder="Search"
                {...form.register('searchAssets')}
                nPlaceholder={{ opacity: 0.7 }}
                fieldProps={{
                  height: '2.5rem',
                  width: '100%',
                  borderRadius: 'full',
                }}
                Prefix={
                  <SearchSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
                }
              />
            </Box>
          </Box>
        </Box>
      </FormProvider>
    </Layout>
  );
};

export default Incinerator;
