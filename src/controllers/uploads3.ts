import { Request, Response } from 'express';
import { PutObjectCommand, ObjectCannedACL, DeleteObjectCommand } from '@aws-sdk/client-s3';
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


export const uploadDocument = async (req: Request, res: Response) => {
  try {
    if (!req.files || !req.files.documents) {
      return res.status(400).json({ error: 'No documents were uploaded' });
    }

    const files = Array.isArray(req.files.documents) ? req.files.documents : [req.files.documents];

    const uploadPromises = files.map(async (file: any) => {
      const params = {
        Bucket: "prismalyze",
        Key: `documents/${Date.now()}_${file.name}`,
        Body: file.data,
        ACL: ObjectCannedACL.public_read, // Make the document publicly accessible
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);

      return `https://prismalyze.s3.ap-south-1.amazonaws.com/${params.Key}`;
    });

    const documentUrls = await Promise.all(uploadPromises);

    res.status(200).json({
      message: 'Documents uploaded successfully',
      urls: documentUrls,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading documents', details: (error as Error).message });
  }
};

// Delete a file (image or document) from S3
export const deleteFile = async (req: Request, res: Response) => {
  const { key } = req.body; // The S3 object key (e.g., `uploads/filename.jpg` or `documents/filename.pdf`)

  if (!key) {
    return res.status(400).json({ error: 'File key is required' });
  }

  try {
    const params = {
      Bucket: "prismalyze", // Your S3 bucket name
      Key: key, // The key of the file to delete
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    res.status(200).json({ message: `File with key "${key}" deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting file', details: (error as Error).message });
  }
};