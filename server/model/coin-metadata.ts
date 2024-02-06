import { getModelForClass, mongoose, prop } from '@typegoose/typegoose';

export class CoinMetadata {
  @prop({ required: true, index: true })
  public type!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public symbol!: string;

  @prop({ required: false })
  public description!: string;

  @prop({ required: true })
  public decimals!: number;

  @prop({ required: false })
  public id?: string | null;

  @prop({ required: false })
  public iconUrl?: string | null;
}

const CoinMetadataModel =
  mongoose.models.CoinMetadata || getModelForClass(CoinMetadata);

export default CoinMetadataModel;
