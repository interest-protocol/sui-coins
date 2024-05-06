import mongoose, { Document, Schema } from 'mongoose';

import { Network } from '@/constants';

export interface EventCursorModel extends Document {
  eventId: string;
  eventSeq: string;
  txDigest: string;
}

const modelName = 'EventCursor';
const testnetModelName = modelName + 'Testnet';

export const ClammGraphSchema = new Schema({
  eventId: {
    type: String,
    required: true,
    index: true,
  },
  eventSeq: {
    type: String,
    required: true,
  },
  txDigest: {
    type: String,
    required: true,
  },
});

const mainnetModel =
  mongoose.models[modelName] ||
  mongoose.model<EventCursorModel>(modelName, ClammGraphSchema);

const testnetModel =
  mongoose.models[testnetModelName] ||
  mongoose.model<EventCursorModel>(testnetModelName, ClammGraphSchema);

export const getEventCursorModel = (network: Network): typeof mainnetModel =>
  network === Network.MAINNET ? mainnetModel : testnetModel;
