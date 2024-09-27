import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Aggregator } from '@/views/swap/swap.types';
import { SwapInterface, SwapInterfaceProps } from '@/views/swap/terminal';

const SwapPage: NextPage = () => {
  const {
    query: { from, to, interval, slippage, fixed, aggregator },
  } = useRouter();

  const props = {
    typeOut: to as string,
    typeIn: from as string,
    aggregator: aggregator as Aggregator,
    fixedIn: (fixed as string)?.includes('in'),
    fixedOut: (fixed as string)?.includes('out'),
    interval: (interval as `${number}`) ?? undefined,
    slippage: (slippage as `${number}`) ?? undefined,
  } as SwapInterfaceProps;

  return <SwapInterface {...props} />;
};

export default SwapPage;
