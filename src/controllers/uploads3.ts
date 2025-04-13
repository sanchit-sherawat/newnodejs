import { Request, Response } from 'express';
import { PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import s3 from '../config/aws';

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.files || !req.files.images) {
      return res.status(400).json({ error: 'No files were uploaded' });
    }

    const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

    const uploadPromises = files.map(async (file: any) => {
      const params = {
        Bucket: "prismalyze" ,
        Key: `uploads/${Date.now()}_${file.name}`,
        Body: file.data
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);

      return `https://prismalyze.s3.ap-south-1.amazonaws.com/${params.Key}`;
    });

    const imageUrls = await Promise.all(uploadPromises);

    res.status(200).json({
      message: 'Images uploaded successfully',
      urls: imageUrls,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading images', details: (error as Error).message });
  }
};