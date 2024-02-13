import mongoose from 'mongoose';

import { CoinMetadataModel, CoinMetadataSchema } from './coin-metadata';

const modelName = 'CoinMetadataTestnet';

export default mongoose.models[modelName] ||
  mongoose.model<CoinMetadataModel>(modelName, CoinMetadataSchema);
