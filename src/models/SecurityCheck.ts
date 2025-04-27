import mongoose, { Schema, Document } from 'mongoose';

export interface ISecurityCheck extends Document {
  blockMarkerRefNumber: string;
  dateTime: Date;
  wrapping: boolean;
  securityPersonnelName: string;
  invoiceNumber: string;
  truckDetails: {
    truckNumber: string;
    truckWeight: number;
    document: string; // URL or file path for the document
  };
}

const SecurityCheckSchema: Schema = new Schema(
  {
    blockMarkerRefNumber: { type: String, required: true },
    dateTime: { type: Date, required: true },
    wrapping: { type: Boolean, required: true },
    securityPersonnelName: { type: String, required: true },
    invoiceNumber: { type: String, required: true },
    truckDetails: {
      truckNumber: { type: String, required: true },
      truckWeight: { type: Number, required: true },
      document: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISecurityCheck>('SecurityCheck', SecurityCheckSchema);