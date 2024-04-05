import mongoose from 'mongoose';

import { ZkSendLinkModel, ZkSendLinkSchema } from './zksend-link';

const modelName = 'ZkSendLinkTestnet';

export default mongoose.models[modelName] ||
  mongoose.model<ZkSendLinkModel>(modelName, ZkSendLinkSchema);
