import express from 'express';
import { createBlockInspection, getBlockInspections } from '../controllers/blockInspectionController';

const router = express.Router();

// POST API to create a block inspection
router.post('/', createBlockInspection);

// GET API to fetch all block inspections
router.get('/', getBlockInspections);

export default router;