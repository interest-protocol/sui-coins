import mongoose, { Document, Schema } from 'mongoose';

import { NFTCollectionMetadata } from '@/interface';

export type NFTCollectionMetadataModel = Document & NFTCollectionMetadata;

const modelName = 'NFTCollectionMetadata';

export const NFTCollectionMetadataSchema =
  new Schema<NFTCollectionMetadataModel>({
    id: {
      type: String,
      required: true,
      index: true,
    },
    img: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    updatedAt: {
      type: Number,
      required: true,
    },
  });

export default mongoose.models[modelName] ||
  mongoose.model<NFTCollectionMetadataModel>(
    modelName,
    NFTCollectionMetadataSchema
  );
