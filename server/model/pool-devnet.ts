import mongoose, { Document, Schema } from 'mongoose';

export interface PoolModel extends Document {
  poolObjectId: string;
  stateId: string;
  coinX: string;
  coinY: string;
  isVolatile: boolean;
}

const modelName = 'PoolDevNet';

export const PoolDevNetSchema = new Schema({
  poolObjectId: {
    type: String,
    required: true,
    index: true,
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
  isVolatile: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.models[modelName] ||
  mongoose.model<PoolModel>(modelName, PoolDevNetSchema);
