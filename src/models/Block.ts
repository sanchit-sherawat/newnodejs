import mongoose, { Schema, Document } from 'mongoose';

export interface IBlock extends Document {
  refNumber: string;
  type: 'g' | 'm';
  dateTime: Date;
  blockColor: string;
  blockQualityGrade: string;
  blockDimension: {
    blockLength: number;
    blockWidth: number;
    blockWeight:number;
    blockHeight: number;
    blockVolume: number;
  };
  additionalDetails: {
    purchasingUnit: string;
    wrappingRequired: boolean;
    truckNumber: string;
    invoiceNumber: string;
    attachments: string[];
  };
  quarryRefId: string;
  remarks?: string;
}

const BlockSchema: Schema = new Schema(
  {
    refNumber: { type: String },
    type: { type: String, enum: ['g', 'm'], required: true },
    dateTime: { type: Date, required: true },
    blockColor: { type: String, required: true },
    blockQualityGrade: { type: String, required: true },
    blockDimension: {
      blockLength: { type: Number, required: true },
      blockWidth: { type: Number, required: true },
      blockWeight: { type: Number, required: true },
      blockHeight: { type: Number, required: true },
      blockVolume: { type: Number, required: true },
    },
    additionalDetails: {
      purchasingUnit: { type: String, required: true },
      wrappingRequired: { type: Boolean, required: true },
      truckNumber: { type: String, required: true },
      invoiceNumber: { type: String, required: true },
      attachments: [{ type: String }],

    },
    quarryRefId: {
      type: String, required: true, 
    },
    remarks: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IBlock>('Block', BlockSchema);