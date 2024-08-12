import mongoose, { Document, Model, Schema } from 'mongoose';

import { Network } from '@/constants';

const modelName = 'MovementMetricsV2';

export interface Metrics {
  network: Network;
  weeklyTXs: Record<number, number>;
  weeklyUsers: Record<number, number>;
}

export type MetricsDocument = Document & Metrics;

export const MetricsSchema = new Schema({
  network: {
    index: true,
    type: String,
    required: true,
  },
  weeklyTXs: {
    type: Schema.Types.Map,
  },
  weeklyUsers: {
    type: Schema.Types.Map,
  },
});

export default (mongoose.models[modelName] as Model<MetricsDocument>) ||
  mongoose.model<MetricsDocument>(modelName, MetricsSchema);
