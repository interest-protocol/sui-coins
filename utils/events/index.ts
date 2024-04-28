import { QueryEventsParams, SuiClient } from '@mysten/sui.js/client';

export const queryAllEvents = async (
  client: SuiClient,
  params: QueryEventsParams
) => {
  // eslint-disable-next-line prefer-const
  let { data, nextCursor, hasNextPage } = await client.queryEvents(params);
  let lastCursor = nextCursor;

  while (hasNextPage) {
    const paginatedEvents = await client.queryEvents({
      ...params,
      cursor: nextCursor,
      order: params?.order ? params.order : 'ascending',
    });

    if (paginatedEvents.data.length) data.push(...paginatedEvents.data);
    nextCursor = paginatedEvents.nextCursor;
    hasNextPage = paginatedEvents.hasNextPage;
    lastCursor = nextCursor ? nextCursor : lastCursor;
  }

  return {
    data,
    lastCursor,
  };
};
