import { Request, Response } from 'express';
import Quarries from '../models/Quarries';

export const createQuarry = async (req: Request, res: Response) => {
  try {
    const quarry = await Quarries.create(req.body);
    res.status(201).json(quarry);
  } catch (error) {
    res.status(500).json({ error: 'Error creating quarry', details: (error as Error).message });
  }
};

export const getQuarries = async (req: Request, res: Response) => {
  try {
    const quarries = await Quarries.find();
    res.status(200).json(quarries);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quarries', details: (error as Error).message });
  }
};

export const getQuarryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const quarry = await Quarries.findById(id);
    if (!quarry) return res.status(404).json({ error: 'Quarry not found' });
    res.status(200).json(quarry);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quarry', details: (error as Error).message });
  }
};