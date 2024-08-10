import mongoose, { Document, Model, Schema } from 'mongoose';

import { Network } from '@/constants';

const modelName = 'MovementMetrics';

export interface Metrics {
  network: Network;
  weekly: Record<number, number>;
}

export type MetricsDocument = Document & Metrics;

export const MetricsSchema = new Schema({
  network: {
    index: true,
    type: String,
    required: true,
  },
  weekly: {
    type: Schema.Types.Mixed,
  },
});

export default (mongoose.models[modelName] as Model<MetricsDocument>) ||
  mongoose.model<MetricsDocument>(modelName, MetricsSchema);
