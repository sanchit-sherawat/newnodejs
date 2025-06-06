import { Request, Response } from 'express';
import Block from '../models/Block';

export const createBlock = async (req: Request, res: Response) => {
  try {
    const block = await Block.create(req.body);
    res.status(201).json(block);
  } catch (error) {
    res.status(500).json({ error: 'Error creating block', details: (error as Error).message });
  }
};

export const getBlocks = async (req: Request, res: Response) => {
  try {
    const blocks = await Block.find();
    res.status(200).json(blocks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blocks', details: (error as Error).message });
  }
};

export const getBlockById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const block = await Block.findById(id);
    if (!block) return res.status(404).json({ error: 'Block not found' });
    res.status(200).json(block);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching block', details: (error as Error).message });
  }
};

// Controller to get blocks by quarryRefId
export const getBlockByQuarryRefId = async (req: Request, res: Response) => {
  const { quarryRefId } = req.params;

  try {
    const blocks = await Block.find({ quarryRefId });

    if (!blocks || blocks.length === 0) {
      return res.status(404).json({ message: 'No blocks found for the given quarryRefId' });
    }

    res.status(200).json(blocks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update block by ID
export const updateBlockById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedBlock = await Block.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedBlock) {
      return res.status(404).json({ error: 'Block not found' });
    }

    res.status(200).json({
      message: 'Block updated successfully',
      block: updatedBlock,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error updating block',
      details: (error as Error).message,
    });
  }
};

export const deleteBlockById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedBlock = await Block.findByIdAndDelete(id);

    if (!deletedBlock) {
      return res.status(404).json({ error: 'Block not found' });
    }

    res.status(200).json({
      message: 'Block deleted successfully',
      block: deletedBlock,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error deleting block',
      details: (error as Error).message,
    });
  }
};