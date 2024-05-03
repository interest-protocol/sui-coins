import mongoose, { Document, Schema } from 'mongoose';

import { Network } from '@/constants';

export interface ClammGraphModel extends Document {
  graph: string[][];
}

const modelName = 'ClammGraph';
const testnetModelName = modelName + 'Testnet';

const ClammGraphSchema = new Schema({
  graph: {
    type: [[String]],
    required: true,
  },
});

const mainnetModel =
  mongoose.models[modelName] ||
  mongoose.model<ClammGraphModel>(modelName, ClammGraphSchema);

const testnetModel =
  mongoose.models[testnetModelName] ||
  mongoose.model<ClammGraphModel>(testnetModelName, ClammGraphSchema);

export const getClammGraphModel = (network: Network) =>
  network === Network.MAINNET ? mainnetModel : testnetModel;
