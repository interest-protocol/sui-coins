import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Layout from '@/components/layout';
import { ModalProvider } from '@/context/modal';

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
    <FormProvider {...form}>
      <ModalProvider>
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
            <IncineratorTable />
          </Box>
        </Layout>
      </ModalProvider>
    </FormProvider>
  );
};

export default Incinerator;
