import { getModelForClass, prop } from '@typegoose/typegoose';

class NFTCollection {
  @prop({ required: true, index: true })
  public collectionId!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public holders!: ReadonlyArray<string>;

  @prop({ required: true })
  public updatedAt!: number;
}

const NFTCollectionModel = getModelForClass(NFTCollection);

export default NFTCollectionModel;
