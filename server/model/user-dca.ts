import mongoose, { Document, Schema } from 'mongoose';

const modelName = 'UserDCA';

export interface UserDCAModel extends Document {
  active: ReadonlyArray<string>;
  destroyed: ReadonlyArray<string>;
}

export const UserDCASchema = new Schema({
  active: [
    {
      type: Schema.Types.ObjectId,
      ref: 'DCA',
    },
  ],
  destroyed: [
    {
      type: Schema.Types.ObjectId,
      ref: 'DCA',
    },
  ],
});

export default mongoose.models[modelName] ||
  mongoose.model<UserDCAModel>(modelName, UserDCASchema);
