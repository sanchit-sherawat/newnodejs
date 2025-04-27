import express from 'express';
import { createBlockInspection, getAllSecurityChecks, getBlockInspections } from '../controllers/blockInspectionController';

const router = express.Router();

// POST API to create a block inspection
router.post('/', createBlockInspection);

// GET API to fetch all block inspections
router.get('/', getBlockInspections);
// New route to get all security checks
router.get('/all-security-checks', getAllSecurityChecks);

export default router;