import { Request, Response } from 'express';
import Role from '../models/Role';

export const createRole = async (req: Request, res: Response) => {
  const { name, permissions } = req.body;

  try {
    const newRole = await Role.create({ name, permissions });
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ error: 'Error creating role' });
  }
};

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role.find().populate('permissions');
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching roles' });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, permissions } = req.body;

  try {
    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { name, permissions },
      { new: true }
    ).populate('permissions');
    if (!updatedRole) return res.status(404).json({ error: 'Role not found' });
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ error: 'Error updating role' });
  }
};
