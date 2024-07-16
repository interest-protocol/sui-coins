import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import Merge from '@/views/merge';
import { IMergeForm } from '@/views/merge/merge.types';

const MergePage: NextPage = () => {
  const form = useForm<IMergeForm>({
    defaultValues: { ignored: [] },
  });

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Merge Coins" />
      <Merge />
    </FormProvider>
  );
};

export default MergePage;
