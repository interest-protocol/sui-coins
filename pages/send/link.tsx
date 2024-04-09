import { useCurrentAccount } from '@mysten/dapp-kit';
import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import SendClaim from '@/views/send-claim';
import { IClaimForm } from '@/views/send-claim/send-claim.types';
import SendLink from '@/views/send-link';
import { useLink } from '@/views/send-link/send-link.hooks';

const SendLinkPage: NextPage = () => {
  const claimForm = useForm<IClaimForm>();
  const currentAccount = useCurrentAccount();
  const { data, isLoading, error, mutate } = useLink();

  if (
    !currentAccount ||
    (data?.creatorAddress && data?.creatorAddress !== currentAccount.address)
  )
    return (
      <FormProvider {...claimForm}>
        <SendClaim
          data={data}
          error={error}
          mutate={mutate}
          isLoading={isLoading}
        />
      </FormProvider>
    );

  return <SendLink data={data} error={error} isLoading={isLoading} />;
};

export default SendLinkPage;
