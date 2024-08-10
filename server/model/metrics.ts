import mongoose, { Document, Model, Schema } from 'mongoose';

import { Network } from '@/constants';

const modelName = 'MovementMetrics';

export interface Metrics {
  network: Network;
  weeklyTXs: Record<number, number>;
  weeklyUsers: Record<number, ReadonlyArray<string>>;
}

export type MetricsDocument = Document & Metrics;

export const MetricsSchema = new Schema({
  network: {
    index: true,
    type: String,
    required: true,
  },
  weeklyTXs: {
    type: Schema.Types.Mixed,
  },
  weeklyUsers: {
    type: Schema.Types.Mixed,
  },
});

export default (mongoose.models[modelName] as Model<MetricsDocument>) ||
  mongoose.model<MetricsDocument>(modelName, MetricsSchema);
