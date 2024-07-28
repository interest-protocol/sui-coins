import mongoose, { Document, Model, Schema } from 'mongoose';

import { Network } from '@/constants';

export interface AMMPool {
  poolObjectId: string;
  stateId: string;
  coinX: string;
  coinY: string;
  isVolatile: boolean;
  lpCoinType: string;
}

export type AMMPoolModel = AMMPool & Document;

const modelName = 'MovementAMMPool';

const devnetname = modelName + 'Devnet';
const testnet = modelName + 'Testnet';

export const AmmPoolSchema = new Schema({
  poolObjectId: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  stateId: {
    type: String,
    required: true,
  },
  coinX: {
    type: String,
    index: true,
    required: true,
  },
  coinY: {
    type: String,
    index: true,
    required: true,
  },
  lpCoinType: {
    type: String,
    index: true,
    required: true,
  },
  isVolatile: {
    type: Boolean,
    required: true,
  },
});

const devnetModel =
  (mongoose.models[devnetname] as Model<AMMPoolModel>) ||
  mongoose.model<AMMPoolModel>(devnetname, AmmPoolSchema);

const testnetModel =
  (mongoose.models[testnet] as Model<AMMPoolModel>) ||
  mongoose.model<AMMPoolModel>(testnet, AmmPoolSchema);

export const getAmmPoolModel = (x: Network) =>
  x === Network.TESTNET ? testnetModel : devnetModel;
