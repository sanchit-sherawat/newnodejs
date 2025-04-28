import { Request, Response } from 'express';
import BlockInspection from '../models/BlockInspection';
import SecurityCheck from '../models/SecurityCheck';

// Create a new block inspection
export const createBlockInspection = async (req: Request, res: Response) => {
  try {
    const {
      blockMarkerRefNumber,
      blockSecurity,
      dimension,
      observations,
      crackFractureDetection,
      attachments,
    } = req.body;

    const newBlockInspection = await BlockInspection.create({
      blockMarkerRefNumber,
      blockSecurity,
      dimension,
      observations,
      crackFractureDetection,
      attachments,
    });

    res.status(201).json({
      message: 'Block inspection created successfully',
      blockInspection: newBlockInspection,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error creating block inspection',
      details: (error as Error).message,
    });
  }
};

// Get all block inspections
export const getBlockInspections = async (req: Request, res: Response) => {
  try {
    const blockInspections = await BlockInspection.find();
    res.status(200).json(blockInspections);
  } catch (error) {
    res.status(500).json({
      error: 'Error fetching block inspections',
      details: (error as Error).message,
    });
  }
};

// Get all security checks
export const getAllSecurityChecks = async (req: Request, res: Response) => {
    try {
      const securityChecks = await SecurityCheck.find(); // Fetch all security checks
      res.status(200).json(securityChecks);
    } catch (error) {
      res.status(500).json({
        error: 'Error fetching security checks',
        details: (error as Error).message,
      });
    }
  };

  export const getAllSecurityChecksWithBlocks = async (req: Request, res: Response) => {
    try {
      const securityChecks = await SecurityCheck.find()
        .populate({
          path: 'blockMarkerRefNumber', // Field in SecurityCheck
          model: 'Block', // Reference model
          localField: 'blockMarkerRefNumber', // Field in SecurityCheck
          foreignField: 'refNumber', // Field in Block
          justOne: true, // Return a single block
        });
  
      res.status(200).json(securityChecks);
    } catch (error) {
      res.status(500).json({
        error: 'Error fetching security checks with related blocks',
        details: (error as Error).message,
      });
    }
  };