import { useCurrentAccount } from '@mysten/dapp-kit';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import SendClaim from '@/views/send-claim';
import { IClaimForm } from '@/views/send-claim/send-claim.types';
import SendLink from '@/views/send-link';
import { useLinkWithUrl } from '@/views/send-link/send-link.hooks';

const SendLinkPage: NextPage = () => {
  const { query } = useRouter();
  const claimingState = useState(false);
  const claimForm = useForm<IClaimForm>();
  const currentAccount = useCurrentAccount();
  const { data, isLoading, error } = useLinkWithUrl(
    query.id as string,
    claimingState[0]
  );

  if (
    !currentAccount ||
    (data?.link?.creatorAddress &&
      data?.link?.creatorAddress !== currentAccount.address)
  )
    return (
      <FormProvider {...claimForm}>
        <SendClaim
          error={error}
          data={data}
          isLoading={isLoading}
          id={query.id as string}
          claimingState={claimingState}
        />
      </FormProvider>
    );

  return (
    <SendLink
      error={error}
      data={data}
      isLoading={isLoading}
      id={query.id as string}
    />
  );
};

export default SendLinkPage;
