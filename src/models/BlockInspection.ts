import mongoose, { Schema, Document } from 'mongoose';

export interface IBlockInspection extends Document {
  blockMarkerRefNumber: string;
  blockSecurity: {
    blockNumber: string;
    dateTime: Date;
    type: string;
    grade: string;
    blockInspector: string;
    color: string;
    imageUrls: string[];
  };
  dimension: {
    blockLength: number;
    blockWidth: number;
    blockHeight: number;
    blockWeight: number;
    blockVolume: number;
  };
  observations: {
    surfaceQuality: string;
    structuralIntegrity: string;
    thicknessCheck: string;
  };
  crackFractureDetection: {
    crackFractureDetection: boolean;
    count: number;
    drawingBoard: string[]; // Array of selected sides
  };
  attachments: {
    pictures: string[]; // Array of image URLs
    remarks: string;
    referenceFiles: string[]; // Array of file URLs
  };
}

const BlockInspectionSchema: Schema = new Schema(
  {
    blockMarkerRefNumber: { type: String, required: true },
    blockSecurity: {
      blockNumber: { type: String, required: true },
      dateTime: { type: Date, required: true },
      type: { type: String, required: true },
      grade: { type: String, required: true },
      blockInspector: { type: String, required: true },
      color: { type: String, required: true },
      imageUrls: [{ type: String, required: true }],
    },
    dimension: {
      blockLength: { type: Number, required: true },
      blockWidth: { type: Number, required: true },
      blockHeight: { type: Number, required: true },
      blockWeight: { type: Number, required: true },
      blockVolume: { type: Number, required: true },
    },
    observations: {
      surfaceQuality: { type: String, required: true },
      structuralIntegrity: { type: String, required: true },
      thicknessCheck: { type: String, required: true },
    },
    crackFractureDetection: {
      crackFractureDetection: { type: Boolean, required: true },
      count: { type: Number, required: true },
      drawingBoard: [{ type: String, required: true }],
    },
    attachments: {
      pictures: [{ type: String }],
      remarks: { type: String, required: true },
      referenceFiles: [{ type: String}],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBlockInspection>('BlockInspection', BlockInspectionSchema);