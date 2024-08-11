import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import Swap from '@/views/swap';
import { Aggregator, SwapForm } from '@/views/swap/swap.types';
import SwapInitManager from '@/views/swap/swap-init-manager';

const FaucetPage: NextPage = () => (
  <>
    <SEO pageTitle="Faucet" />
    <Faucet />
  </>
);

export default FaucetPage;
