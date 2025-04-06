import mongoose, { Schema, Document } from 'mongoose';

export interface IQuarries extends Document {
  name: string;
  value: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  imageUrl: string;
  refId: string;
}

const QuarriesSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
    address: { type: String, required: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    imageUrl: { type: String, required: true },
    refId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<IQuarries>('Quarries', QuarriesSchema);