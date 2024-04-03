import mongoose, { Document, Schema } from 'mongoose';

const modelName = 'DCA';

interface ActiveDCA {
  cooldown: string;
  objectId: string;
  owner: string;
}

export interface ActiveDCAModel extends Document {
  objectsIds: ReadonlyArray<ActiveDCA>;
}

export const ActiveDCASchema = new Schema({
  dcas: [
    {
      cooldown: {
        type: String,
        required: true,
      },
      objectId: {
        type: String,
        required: true,
        index: true,
      },
      owner: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.models[modelName] ||
  mongoose.model<ActiveDCAModel>(modelName, ActiveDCASchema);
