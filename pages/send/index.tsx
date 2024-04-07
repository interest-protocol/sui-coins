import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { SEO } from '@/components';
import { Network, Routes, RoutesEnum } from '@/constants';
import { AllObjectsProvider } from '@/context/all-objects';
import { useNetwork } from '@/context/network';
import Send from '@/views/send';

const SendPage: NextPage = () => {
  const network = useNetwork();
  const { push } = useRouter();

  useEffect(() => {
    if (network === Network.TESTNET) push(Routes[RoutesEnum.Swap]);
  }, [network]);

  return (
    <AllObjectsProvider>
      <SEO pageTitle="Send " />
      <Send />
    </AllObjectsProvider>
  );
};
export default SendPage;
