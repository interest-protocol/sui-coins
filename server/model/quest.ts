import mongoose, { Document, Model, Schema } from 'mongoose';

const modelName = 'MovementQuestDevnet';

interface Coin {
  type: string;
  symbol: string;
  amount: string;
}

export interface SwapData {
  coinIn: Coin;
  coinOut: Coin;
}

export interface FaucetData {
  coin: Coin;
}

export interface AirdropData {
  coin: Coin;
  addressesCount: number;
}

export interface CreateTokenData {
  coin: Coin;
}

export type Quest = {
  address: string;
  timestamp: number;
} & (
  | {
      kind: 'swap';
      data: SwapData;
    }
  | {
      kind: 'faucet';
      data: FaucetData;
    }
  | {
      kind: 'airdrop';
      data: AirdropData;
    }
  | {
      kind: 'createToken';
      data: CreateTokenData;
    }
);
export type QuestDocument = Document & Quest;

export const QuestSchema = new Schema({
  address: {
    index: true,
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  kind: {
    index: true,
    type: String,
    required: true,
  },
  data: {
    required: true,
    type: Schema.Types.Mixed,
  },
});

export default (mongoose.models[modelName] as Model<QuestDocument>) ||
  mongoose.model<QuestDocument>(modelName, QuestSchema);
