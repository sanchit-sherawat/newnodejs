import mongoose, { Schema, Document } from 'mongoose';

export interface ILicense extends Document {
  userId: mongoose.Schema.Types.ObjectId; // Reference to the user
  maxUsers: number; // Maximum number of users the license allows
  createdAt: Date;
  updatedAt: Date;
}

const LicenseSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    maxUsers: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ILicense>('License', LicenseSchema);