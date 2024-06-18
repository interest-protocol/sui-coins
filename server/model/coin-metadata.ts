import mongoose, { Document, Model, Schema } from 'mongoose';

export interface CoinMetadataModel extends Document {
  type: string;
  name: string;
  symbol: string;
  description?: string;
  decimals: number;
  id?: string | null;
  iconUrl?: string | null;
}

const modelName = 'CoinMetadata';

export const CoinMetadataSchema = new Schema({
  type: {
    index: true,
    unique: true,
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  symbol: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  decimals: {
    type: Number,
  },
  id: {
    type: String,
    default: null,
  },
  iconUrl: {
    type: String,
    default: null,
  },
});

export default (mongoose.models[modelName] as Model<CoinMetadataModel>) ||
  mongoose.model<CoinMetadataModel>(modelName, CoinMetadataSchema);
