import mongoose, { Document, Schema } from 'mongoose';

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
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
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

export default mongoose.models[modelName] ||
  mongoose.model<CoinMetadataModel>(modelName, CoinMetadataSchema);
