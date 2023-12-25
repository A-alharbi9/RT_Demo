import Mongoose from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';

class User {
  @prop({ required: true })
  public empId!: string;

  @prop({ required: true })
  public fullName!: string;

  @prop({ default: 'sales associate' })
  public position!: string;
}

export const userModel =
  Mongoose.models.User ||
  getModelForClass(User, { schemaOptions: { timestamps: true } });
