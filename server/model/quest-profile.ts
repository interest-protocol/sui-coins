import mongoose, { Document, Model, Schema } from 'mongoose';

const modelName = 'MovementQuestProfileImolaTestnet';

export interface QuestProfile {
  address: string;
  lastSwapAt: number;
  lastAirdropAt: number;
  lastCreatePoolAt: number;
  lastCreateTokenAt: number;
  lastAddLiquidityAt: number;
  lastFaucetAt: Record<string, number>;
}

export type QuestProfileDocument = Document & QuestProfile;

export const QuestProfileSchema = new Schema({
  address: {
    index: true,
    type: String,
    required: true,
    unique: true,
  },
  lastFaucetAt: Object,
  lastSwapAt: { type: Number },
  lastAirdropAt: { type: Number },
  lastCreatePoolAt: { type: Number },
  lastCreateTokenAt: { type: Number },
  lastAddLiquidityAt: { type: Number },
});

export default (mongoose.models[modelName] as Model<QuestProfileDocument>) ||
  mongoose.model<QuestProfileDocument>(modelName, QuestProfileSchema);
