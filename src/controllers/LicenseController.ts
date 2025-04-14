import { Request, Response } from 'express';
import License from '../models/License';

// Create a new license
export const createLicense = async (req: Request, res: Response) => {
  const { userId, maxUsers } = req.body;

  try {
    const license = await License.create({ userId, maxUsers });
    res.status(201).json(license);
  } catch (error) {
    res.status(500).json({ error: 'Error creating license', details: (error as Error).message });
  }
};

// Get all licenses
export const getLicenses = async (req: Request, res: Response) => {
  try {
    const licenses = await License.find().populate('userId', 'username email'); // Populate user details
    res.status(200).json(licenses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching licenses', details: (error as Error).message });
  }
};

// Get a license by ID
export const getLicenseById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const license = await License.findById(id).populate('userId', 'username email');
    if (!license) return res.status(404).json({ error: 'License not found' });

    res.status(200).json(license);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching license', details: (error as Error).message });
  }
};

// Update a license
export const updateLicense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { maxUsers } = req.body;

  try {
    const license = await License.findByIdAndUpdate(
      id,
      { maxUsers },
      { new: true, runValidators: true }
    );
    if (!license) return res.status(404).json({ error: 'License not found' });

    res.status(200).json(license);
  } catch (error) {
    res.status(500).json({ error: 'Error updating license', details: (error as Error).message });
  }
};