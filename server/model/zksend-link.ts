import mongoose, { Document, Schema } from 'mongoose';

export interface ZkSendLinkModel extends Document {
  id: string;
  link: string;
  sender: string;
}

const modelName = 'ZkSendLink';

export const ZkSendLinkSchema = new Schema({
  id: {
    index: true,
    type: String,
    required: true,
  },
  digest: {
    index: true,
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

export default mongoose.models[modelName] ||
  mongoose.model<ZkSendLinkModel>(modelName, ZkSendLinkSchema);
