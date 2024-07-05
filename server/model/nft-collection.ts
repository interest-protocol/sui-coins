import mongoose, { Document, Model, Schema } from 'mongoose';

export interface NFTCollectionModel extends Document {
  collectionId: string;
  name: string;
  holders: ReadonlyArray<string>;
  updatedAt: number;
}

const modelName = 'NFTCollection';

export const NFTCollectionSchema = new Schema({
  collectionId: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  holders: {
    type: [String],
    required: true,
  },
});

export default (mongoose.models[modelName] as Model<NFTCollectionModel>) ||
  mongoose.model<NFTCollectionModel>(modelName, NFTCollectionSchema);
