import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Layout from '@/components/layout';

import { IncineratorForm, IncineratorTabEnum } from './incinerator.types';
import IncineratorButton from './incinerator-button';
import IncineratorHeader from './incinerator-header';
import IncineratorTable from './incinerator-table';
import IncineratorFilterTabs from './incinerator-tabs';

const Incinerator: FC = () => {
  const form = useForm<IncineratorForm>({
    defaultValues: {
      objects: [],
      tab: IncineratorTabEnum.All,
    },
  });

  return (
    <FormProvider {...form}>
      <Layout>
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
          <Box mb="l" display="grid" gap="l">
            <IncineratorTable />
            <IncineratorButton />
          </Box>
        </Box>
      </Layout>
    </FormProvider>
  );
};

export default Incinerator;
