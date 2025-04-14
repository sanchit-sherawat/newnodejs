import express from 'express';
import {
  createLicense,
  getLicenses,
  getLicenseById,
  updateLicense,
} from '../controllers/LicenseController';

const router = express.Router();

// Create a new license
router.post('/', createLicense);

// Get all licenses
router.get('/', getLicenses);

// Get a license by ID
router.get('/:id', getLicenseById);

// Update a license
router.put('/:id', updateLicense);

export default router;