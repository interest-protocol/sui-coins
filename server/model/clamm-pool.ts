import mongoose, { Document, Schema } from 'mongoose';

import { Network } from '@/constants';

export interface ClammPoolType {
  poolObjectId: string;
  lpCoinType: string;
  isStable: boolean;
  coinTypes: readonly string[];
}

export interface ClammPoolModel extends Document {}

const modelName = 'ClammPool';
const testnetModelName = modelName + 'Testnet';

export const ClammPoolSchema = new Schema({
  poolObjectId: {
    type: String,
    required: true,
    index: true,
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
});

const mainnetModel =
  mongoose.models[modelName] ||
  mongoose.model<ClammPoolModel>(modelName, ClammPoolSchema);

const testnetModel =
  mongoose.models[testnetModelName] ||
  mongoose.model<ClammPoolModel>(testnetModelName, ClammPoolSchema);

export const getClammPoolModel = (network: Network) =>
  network === Network.MAINNET ? mainnetModel : testnetModel;
