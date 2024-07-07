import mongoose, { Document, Model, Schema } from 'mongoose';

const modelName = 'MovementQuestProfileDevnet';

type QuestData = Record<number, number>;

export interface QuestProfile {
  address: string;
  swap: QuestData;
  faucet: Record<number, Record<string, number>>;
  createPool: QuestData;
  addLiquidity: QuestData;
  airdrop: QuestData;
  createToken: QuestData;
}

export type QuestProfileDocument = Document & QuestProfile;

export const QuestProfileSchema = new Schema({
  address: {
    index: true,
    type: String,
    required: true,
    unique: true,
  },
  swap: Object,
  faucet: Object,
  createPool: Object,
  addLiquidity: Object,
  airdrop: Object,
  createToken: Object,
});

export default (mongoose.models[modelName] as Model<QuestProfileDocument>) ||
  mongoose.model<QuestProfileDocument>(modelName, QuestProfileSchema);
