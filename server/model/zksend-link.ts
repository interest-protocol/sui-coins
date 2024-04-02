import mongoose, { Document, Schema } from 'mongoose';

export interface ZkSendLinkModel extends Document {
  id: string;
  digest: string;
  links: ReadonlyArray<string>;
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
  links: {
    type: [String],
    required: true,
  },
});

export default mongoose.models[modelName] ||
  mongoose.model<ZkSendLinkModel>(modelName, ZkSendLinkSchema);
