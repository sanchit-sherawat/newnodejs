import express from 'express';
import { createBlock, getBlocks, getBlockById, getBlockByQuarryRefId, updateBlockById, deleteBlockById } from '../controllers/blockController';

const router = express.Router();

router.get('/quarry/:quarryRefId', getBlockByQuarryRefId);
router.post('/', createBlock); // POST API to create a block
router.get('/', getBlocks); // GET API to fetch all blocks
router.get('/:id', getBlockById); // GET API to fetch a block by ID
// Update block by ID
router.put('/:id', updateBlockById);

// Delete block by ID
router.delete('/:id', deleteBlockById);

export default router;