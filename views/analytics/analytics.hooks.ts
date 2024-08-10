import { useSuiClient } from '@mysten/dapp-kit';
import useSWR from 'swr';

const useQuestMetrics = (query: any) =>
  useSWR(`/api/v1/metrics?find=${JSON.stringify(query)}`, () =>
    fetch(`/api/v1/metrics?find=${JSON.stringify(query)}`).then((response) =>
      response?.json()
    )
  );

const useQuestProfiles = () =>
  useSWR(`/api/v1/profiles`, () =>
    fetch(`/api/v1/profiles`).then((response) => response?.json())
  );

const usePoolsMetrics = () => {
  const suiClient = useSuiClient();

  return useSWR('pools', () =>
    suiClient
      .getObject({
        id: '0xaa3be47d3edde41e3bf4ad6ddb0ab438cdfb988dd29d7aa878c787d0a3f1190a',
        options: {
          showContent: true,
        },
      })
      .then(
        (response) => (response.data?.content as any)?.fields.pools.fields.size
      )
  );
};

export const useWeeklyMetrics = () =>
  useSWR(`/api/v1/metrics/weekly`, () =>
    fetch(`/api/v1/metrics/weekly`).then((response) => response?.json())
  );

export const useMetrics = () => {
  const { data: totalCount, isLoading: totalLoading } = useQuestMetrics({});
  const { data: usersCount, isLoading: usersLoading } = useQuestProfiles();
  const { data: swapCount, isLoading: swapLoading } = useQuestMetrics({
    kind: 'swap',
  });
  const { data: faucetCount, isLoading: faucetLoading } = useQuestMetrics({
    kind: 'faucet',
  });
  const { data: airdropCount, isLoading: airdropLoading } = useQuestMetrics({
    kind: 'airdrop',
  });
  const { data: poolsCount, isLoading: poolsLoading } = usePoolsMetrics();
  const { data: createTokenCount, isLoading: createTokenLoading } =
    useQuestMetrics({
      kind: 'createToken',
    });
  const { data: addLiquidityCount, isLoading: addLiquidityLoading } =
    useQuestMetrics({ kind: 'addLiquidity' });

  return {
    swapCount,
    swapLoading,
    totalCount,
    totalLoading,
    usersLoading,
    usersCount,
    faucetCount,
    faucetLoading,
    airdropCount,
    airdropLoading,
    createTokenCount,
    createTokenLoading,
    poolsCount,
    poolsLoading,
    addLiquidityCount,
    addLiquidityLoading,
  };
};
