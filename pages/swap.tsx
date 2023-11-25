import { NextPage } from 'next';
import { useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { TOKEN_SYMBOL } from '@/lib';
import Swap from '@/views/swap';
import { ISwapSettingsForm, SwapForm } from '@/views/swap/swap.types';

const SwapPage: NextPage = () => {
  const formSwap = useForm<SwapForm>({
    defaultValues: {
      to: {
        value: '0.3',
        balance: 0.0456,
        decimals: 0,
        symbol: TOKEN_SYMBOL.BNB,
        type: '',
      },
      from: {
        value: '0.05',
        balance: 0.1756,
        decimals: 0,
        symbol: TOKEN_SYMBOL.BTC,
        type: '',
      },
    },
  });

  const formSettings = useForm<ISwapSettingsForm>({
    defaultValues: {
      slippage: '0.1',
      speed: 'instant',
      deadline: '3',
    },
  });

  return (
    <>
      <SEO pageTitle="Swap" />
      <Swap formSwap={formSwap} formSettings={formSettings} />
    </>
  );
};

export default SwapPage;
