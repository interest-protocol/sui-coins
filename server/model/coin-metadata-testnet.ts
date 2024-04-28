import mongoose from 'mongoose';

import { CoinMetadataModel, CoinMetadataSchema } from './coin-metadata';

const modelName = 'MovementCoinMetadataTestnet';

export default mongoose.models[modelName] ||
  mongoose.model<CoinMetadataModel>(modelName, CoinMetadataSchema);
