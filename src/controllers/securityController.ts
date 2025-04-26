import { Request, Response } from 'express';
import Block from '../models/Block';
import SecurityCheck from '../models/SecurityCheck';

// Get additional details for all blocks
export const getAllSecurityBlockAdditionalDetails = async (req: Request, res: Response) => {
  try {
    const blocks = await Block.find({}, 'additionalDetails'); // Fetch only the additionalDetails field
    res.status(200).json(blocks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching additional details', details: (error as Error).message });
  }
};


// Get blocks grouped by truckNumber
export const getBlocksGroupedByTruckNumber = async (req: Request, res: Response) => {
    try {
      // Fetch all blocks and group them by truckNumber
      const blocks = await Block.aggregate([
        {
          $group: {
            _id: '$additionalDetails.truckNumber', // Group by truckNumber
            totalBlocks: { $sum: 1 }, // Count the total number of blocks
            blocks: { $push: '$$ROOT' }, // Push the entire block document into an array
          },
        },
        {
          $project: {
            truckNumber: '$_id', // Rename _id to truckNumber
            totalBlocks: 1,
            blocks: 1,
            _id: 0, // Exclude the _id field
          },
        },
      ]);
  
      res.status(200).json(blocks);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching blocks grouped by truck number', details: (error as Error).message });
    }
  };


  export const createSecurityCheck = async (req: Request, res: Response) => {
    const {
      blockMarkerRefNumber,
      dateTime,
      wrapping,
      securityPersonnelName,
      invoiceNumber,
      truckDetails,
    } = req.body;
  
    try {
      const securityCheck = await SecurityCheck.create({
        blockMarkerRefNumber,
        dateTime,
        wrapping,
        securityPersonnelName,
        invoiceNumber,
        truckDetails,
      });
  
      res.status(201).json({
        message: 'Security check created successfully',
        securityCheck,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error creating security check',
        details: (error as Error).message,
      });
    }
  };