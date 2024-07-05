import { PoolMetadata } from '@interest-protocol/clamm-sdk';
import mongoose, { Document, Model, Schema } from 'mongoose';

import { Network } from '@/constants';

export interface ClammPoolModel extends Document {
  poolObjectId: string;
  lpCoinType: string;
  isStable: boolean;
  coinTypes: readonly string[];
  hooks?: PoolMetadata['hooks'] | null;
}

const modelName = 'ClammPool';
const testnetModelName = modelName + 'Testnet';

export const ClammPoolSchema = new Schema({
  poolObjectId: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  lpCoinType: {
    type: String,
    required: true,
  },
  isStable: {
    type: Boolean,
    required: true,
  },
  coinTypes: {
    type: [String],
    index: true,
    required: true,
  },
  hooks: {
    type: Object,
    default: null,
  },
});

const mainnetModel =
  (mongoose.models[modelName] as Model<ClammPoolModel>) ||
  mongoose.model<ClammPoolModel>(modelName, ClammPoolSchema);

const testnetModel =
  (mongoose.models[testnetModelName] as Model<ClammPoolModel>) ||
  mongoose.model<ClammPoolModel>(testnetModelName, ClammPoolSchema);

export const getClammPoolModel = (network: Network) =>
  network === Network.MAINNET ? mainnetModel : testnetModel;
