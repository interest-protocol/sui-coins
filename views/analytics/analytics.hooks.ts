import { useSuiClient } from '@mysten/dapp-kit';
import useSWR from 'swr';

export const useQuestMetrics = (query: any) =>
  useSWR(`/api/v1/metrics?find=${JSON.stringify(query)}`, () =>
    fetch(`/api/v1/metrics?find=${JSON.stringify(query)}`).then((response) =>
      response?.json()
    )
  );

export const useQuestProfiles = () =>
  useSWR(`/api/v1/profiles`, () =>
    fetch(`/api/v1/profiles`).then((response) => response?.json())
  );

export const usePoolsMetrics = () => {
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
