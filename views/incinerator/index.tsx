import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import Layout from '@/components/layout';

import IncineratorBody from './body/table';
import IncineratorFilterTabs from './filter-tabs';
import IncineratorHeader from './header';
import { IncineratorForm } from './incinerator.types';

const Incinerator: FC = () => {
  const form = useForm<IncineratorForm>({
    defaultValues: {
      filter: 0,
    },
  });

  return (
    <Layout>
      <FormProvider {...form}>
        <Box
          mt="3xl"
          mx="auto"
          width="100%"
          display="flex"
          borderRadius="s"
          maxWidth="51rem"
          bg="lowestContainer"
          flexDirection="column"
        >
          <IncineratorHeader />
          <IncineratorFilterTabs />
          <IncineratorBody />
        </Box>
      </FormProvider>
    </Layout>
  );
};

export default Incinerator;
