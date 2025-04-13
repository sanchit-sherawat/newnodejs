// filepath: /Users/sanchitsherawat/Desktop/project/exra/newnodejs/src/config/s3.ts
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
  endpoint: 'https://s3.ap-south-1.amazonaws.com',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID||'',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY||'',
  },
});

export default s3;