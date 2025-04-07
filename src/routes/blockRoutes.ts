import express from 'express';
import { createBlock, getBlocks, getBlockById, getBlockByQuarryRefId } from '../controllers/blockController';

const router = express.Router();

router.post('/', createBlock); // POST API to create a block
router.get('/', getBlocks); // GET API to fetch all blocks
router.get('/:id', getBlockById); // GET API to fetch a block by ID
router.get('/block/:quarryRefId', getBlockByQuarryRefId);

export default router;