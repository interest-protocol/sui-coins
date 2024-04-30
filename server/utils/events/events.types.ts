import { SuiClient } from '@mysten/sui.js/client';
import { EventId, SuiEvent } from '@mysten/sui.js/client';
import { SuiEventFilter } from '@mysten/sui.js/client';

type SuiEventsCursor = EventId | null | undefined;

export interface SaveCursorArgs {
  cursor: EventId;
  type: string;
}

export interface EventData {
  type: string;
  query: SuiEventFilter;
  saveEvent: (args: SuiEvent[]) => Promise<void>;
}

export interface IndexEventArgs {
  suiClient: SuiClient;
  eventData: EventData;
  cursor: SuiEventsCursor;
  saveCursor: (args: SaveCursorArgs) => Promise<void>;
}
