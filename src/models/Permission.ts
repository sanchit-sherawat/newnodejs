import mongoose, { Schema, Document } from 'mongoose';

export interface IPermission extends Document {
  name: string;
  description: string;
}

const PermissionSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IPermission>('Permission', PermissionSchema);
