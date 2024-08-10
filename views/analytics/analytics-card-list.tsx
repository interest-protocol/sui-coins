import { FC } from 'react';

import {
  AirdropSVG,
  CirclePlusSVG,
  DoubleChevronSVG,
  FaucetSVG,
  PlusSVG,
  PoolSVG,
  TotalSVG,
  UserSVG,
} from '@/svg';

import { useMetrics } from './analytics.hooks';
import AnalyticsCard from './analytics-card';

const AnalyticsCards: FC = () => {
  const {
    totalCount,
    totalLoading,
    usersCount,
    usersLoading,
    airdropCount,
    airdropLoading,
    faucetCount,
    faucetLoading,
    swapCount,
    swapLoading,
    createTokenCount,
    createTokenLoading,
    poolsCount,
    poolsLoading,
    addLiquidityCount,
    addLiquidityLoading,
  } = useMetrics();
  return (
    <>
      <AnalyticsCard
        Icon={TotalSVG}
        title="Total TXs"
        quantity={totalCount}
        loading={totalLoading}
      />
      <AnalyticsCard
        title="Unique Users"
        Icon={UserSVG}
        quantity={usersCount}
        loading={usersLoading}
      />
      <AnalyticsCard
        title="Airdrop"
        Icon={AirdropSVG}
        quantity={airdropCount}
        loading={airdropLoading}
      />
      <AnalyticsCard
        title="Faucet"
        Icon={FaucetSVG}
        quantity={faucetCount}
        loading={faucetLoading}
      />
      <AnalyticsCard
        title="Swaps"
        quantity={swapCount}
        loading={swapLoading}
        Icon={DoubleChevronSVG}
      />
      <AnalyticsCard
        Icon={CirclePlusSVG}
        title="Tokens created"
        quantity={createTokenCount}
        loading={createTokenLoading}
      />
      <AnalyticsCard
        Icon={PoolSVG}
        title="Pools created"
        quantity={+poolsCount}
        loading={poolsLoading}
      />
      <AnalyticsCard
        Icon={PlusSVG}
        title="Liquidity Management"
        quantity={addLiquidityCount}
        loading={addLiquidityLoading}
      />
    </>
  );
};

export default AnalyticsCards;
