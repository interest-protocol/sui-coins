import useSWR from 'swr';

export const useMetrics = (query: any) =>
  useSWR(`/api/v1/metrics?find=${JSON.stringify(query)}`, () =>
    fetch(`/api/v1/metrics?find=${JSON.stringify(query)}`).then((response) =>
      response?.json()
    )
  );
