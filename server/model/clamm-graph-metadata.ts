import mongoose, { Document, Schema } from 'mongoose';

import { Network } from '@/constants';

export interface ClammGraphMetadataModel extends Document {
  nextId: string;
}

const modelName = 'ClammGraphMetadata';
const testnetModelName = modelName + 'Testnet';

export const ClammGraphSchema = new Schema({
  nextId: String,
});

const mainnetModel =
  mongoose.models[modelName] ||
  mongoose.model<ClammGraphMetadataModel>(modelName, ClammGraphSchema);

const testnetModel =
  mongoose.models[testnetModelName] ||
  mongoose.model<ClammGraphMetadataModel>(testnetModelName, ClammGraphSchema);

export const getClammGraphMetadataModel = (network: Network) =>
  network === Network.MAINNET ? mainnetModel : testnetModel;
