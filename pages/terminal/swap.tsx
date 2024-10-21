import type {
  Aggregator,
  SwapInterfaceProps,
} from '@interest-protocol/sui-coins-terminal';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const SwapTerminal = dynamic(
  import('@interest-protocol/sui-coins-terminal').then(
    ({ SwapTerminal }) => SwapTerminal
  ),
  { ssr: false }
);

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

  return <SwapTerminal {...props} />;
};

export default SwapPage;
