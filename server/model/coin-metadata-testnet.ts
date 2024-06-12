import mongoose, { Model } from 'mongoose';

import { CoinMetadataModel, CoinMetadataSchema } from './coin-metadata';

const modelName = 'CoinMetadataTestnet';

export default (mongoose.models[modelName] as Model<CoinMetadataModel>) ||
  mongoose.model<CoinMetadataModel>(modelName, CoinMetadataSchema);
