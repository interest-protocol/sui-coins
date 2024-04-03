import mongoose, { Document, Schema } from 'mongoose';

const modelName = 'UserDCA';

export interface UserDCAModel extends Document {
  objectsIds: ReadonlyArray<string>;
}

export const UserDCASchema = new Schema({
  objectIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'DCA',
    },
  ],
});

export default mongoose.models[modelName] ||
  mongoose.model<UserDCAModel>(modelName, UserDCASchema);
