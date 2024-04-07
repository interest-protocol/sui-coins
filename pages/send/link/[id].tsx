import { useCurrentAccount } from '@mysten/dapp-kit';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

import SendClaim from '@/views/send-claim';
import { IClaimForm } from '@/views/send-claim/send-claim.types';
import SendLink from '@/views/send-link';
import { useLinkWithUrl } from '@/views/send-link/send-link.hooks';

const SendLinkPage: NextPage = () => {
  const { query } = useRouter();
  const claimForm = useForm<IClaimForm>();
  const currentAccount = useCurrentAccount();
  const { data, isLoading, error, mutate } = useLinkWithUrl(query.id as string);

  console.log({ data });

  if (
    !currentAccount ||
    (data?.link?.creatorAddress &&
      data?.link?.creatorAddress !== currentAccount.address)
  )
    return (
      <FormProvider {...claimForm}>
        <SendClaim
          data={data}
          error={error}
          mutate={mutate}
          isLoading={isLoading}
          id={query.id as string}
        />
      </FormProvider>
    );

  return (
    <SendLink
      data={data}
      error={error}
      isLoading={isLoading}
      id={query.id as string}
    />
  );
};

export default SendLinkPage;
