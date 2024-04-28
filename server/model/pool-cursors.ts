import mongoose, { Document, Schema } from 'mongoose';

export interface PoolCursorsModel extends Document {
  devNetEventSeq: string;
  devNetTxDigest: string;
  testNetEventSeq: string;
  testNetTxDigest: string;
  allTestNetPoolIds: string[];
  allDevNetPoolIds: string[];
}

const modelName = 'PoolCursors';

export const PoolCursorsSchema = new Schema({
  devNetEventSeq: {
    type: String,
  },
  devNetTxDigest: {
    type: String,
  },
  testNetEventSeq: {
    type: String,
  },
  testNetTxDigest: {
    type: String,
  },
  allTestNetPoolIds: [String],
  allDevNetPoolIds: [String],
});

export default mongoose.models[modelName] ||
  mongoose.model<PoolCursorsModel>(modelName, PoolCursorsSchema);
