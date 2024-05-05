import { SuiClient } from '@mysten/sui.js/client';

import { Network } from '@/constants';
import { CLAMM_PACKAGE_ADDRESSES } from '@/constants/dex';
import { getEventCursorModel } from '@/server/model/event-cursor';
import { sleep } from '@/utils';

import { savePoolMainnetEvents } from './event-handler';
import { EventData, IndexEventArgs, SaveCursorArgs } from './events.types';

const EVENTS_TO_INDEX = {
  [Network.MAINNET]: {
    NEW_2_POOL: {
      type: `${CLAMM_PACKAGE_ADDRESSES[Network.MAINNET].CLAMM}::pool_events`,
      query: {
        MoveEventType: `${CLAMM_PACKAGE_ADDRESSES[Network.MAINNET].CLAMM}::pool_events::NewPool`,
      },
      saveEvent: savePoolMainnetEvents,
    },
  },
  [Network.TESTNET]: {
    NEW_2_POOL: {
      type: `${CLAMM_PACKAGE_ADDRESSES[Network.TESTNET].CLAMM}::pool_events`,
      query: {
        MoveEventType: `${CLAMM_PACKAGE_ADDRESSES[Network.TESTNET].CLAMM}::pool_events::NewPool`,
      },
      saveEvent: async () => {},
    },
  },
} as Record<Network, Record<string, EventData>>;

const indexEventInternal = async ({
  suiClient,
  saveCursor,
  eventData,
  cursor,
}: IndexEventArgs) => {
  const { data, hasNextPage, nextCursor } = await suiClient.queryEvents({
    cursor,
    order: 'ascending',
    query: eventData.query,
  });

  await eventData.saveEvent(data);

  if (nextCursor && data.length) {
    await saveCursor({ cursor: nextCursor, type: eventData.type });
    return {
      cursor: nextCursor,
      hasNextPage,
    };
  }

  return {
    cursor,
    hasNextPage: false,
  };
};

const createSaveCursor =
  (network: Network) =>
  async ({ cursor, type }: SaveCursorArgs) => {
    const model = getEventCursorModel(network);

    const doc: ReturnType<typeof model.findOne> = await model.findOne({
      eventId: type,
    });

    if (doc) {
      doc.updateOne({
        eventId: type,
        ...cursor,
      });
      return;
    }
    const newDoc = new model({
      eventId: type,
      ...cursor,
    });
    await newDoc.save();
  };

export const getLatestCursor = async (network: Network, eventId: string) => {
  const model = getEventCursorModel(network);
  const doc = await model.findOne({ eventId });

  if (!doc) return null;

  return {
    eventSeq: doc.eventSeq,
    txDigest: doc.txDigest,
  };
};

const indexEvent = async ({
  suiClient,
  saveCursor,
  eventData,
  cursor,
}: IndexEventArgs) => {
  const result = await indexEventInternal({
    suiClient,
    saveCursor,
    cursor,
    eventData,
  });

  await sleep(800);

  if (result.hasNextPage)
    indexEvent({ suiClient, saveCursor, eventData, cursor: result.cursor });
};

export const runIndexer = async (suiClient: SuiClient, network: Network) => {
  const eventsToIndex = EVENTS_TO_INDEX[network];

  for (const eventData of Object.values(eventsToIndex)) {
    indexEvent({
      suiClient,
      saveCursor: createSaveCursor(network),
      cursor: await getLatestCursor(network, eventData.type),
      eventData,
    });
  }
};
