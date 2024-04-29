import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Layout from '@/components/layout';

import IncineratorFilterTabs from './filter-tabs';
import IncineratorHeader from './header';
import { IncineratorForm } from './incinerator.types';
import IncineratorTable from './incinerator-table';

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
          bg="lowestContainer"
          flexDirection="column"
          maxWidth={['20rem', '20rem', '20rem', '51rem']}
        >
          <IncineratorHeader />
          <IncineratorFilterTabs />
          <IncineratorTable />
        </Box>
      </FormProvider>
    </Layout>
  );
};

export default Incinerator;
