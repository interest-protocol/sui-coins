import mongoose, { Document, Schema } from 'mongoose';

const modelName = 'DCA';

export interface DCAModel extends Document {
  owner: string;
  delegatee: string;
  startTimestamp: string;
  lastTradeTimestamp: string;
  every: string;
  totalOrders: string;
  remainingOrders: string;
  timeScale: string;
  cooldown: string;
  intitialBalance: string;
  coinIn: string;
  coinOut: string;
  amountPerTrade: string;
  min: string;
  max: string;
  active: boolean;
  ownerOutputBalance: string;
  delegateOutputBalance: string;
  feePercent: string;
}

export const DCASchema = new Schema({
  _id: Schema.Types.ObjectId,
  owner: {
    type: String,
    required: true,
    index: true,
  },
  delegatee: {
    type: String,
    required: true,
  },
  startTimestamp: {
    type: String,
    required: true,
  },
  lastTradeTimestamp: {
    type: String,
    required: true,
  },
  every: {
    type: String,
    required: true,
  },
  totalOrders: {
    type: String,
    required: true,
  },
  remainingOrders: {
    type: String,
    required: true,
  },
  timeScale: {
    type: Number,
    required: true,
  },
  cooldown: {
    type: String,
    required: true,
  },
  intitialBalance: {
    type: String,
    required: true,
  },
  coinIn: {
    type: String,
    required: true,
  },
  coinOut: {
    type: String,
    required: true,
  },
  amountPerTrade: {
    type: String,
    required: true,
  },
  min: {
    type: String,
    required: true,
  },
  max: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  ownerOutputBalance: {
    type: String,
    required: true,
  },
  delegateOutputBalance: {
    type: String,
    required: true,
  },
  feePercent: {
    type: String,
    required: true,
  },
});

export default mongoose.models[modelName] ||
  mongoose.model<DCAModel>(modelName, DCASchema);
