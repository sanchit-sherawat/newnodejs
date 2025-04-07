import express from 'express';
import { createBlock, getBlocks, getBlockById, getBlockByQuarryRefId } from '../controllers/blockController';

const router = express.Router();

router.get('/quarry/:quarryRefId', getBlockByQuarryRefId);
router.post('/', createBlock); // POST API to create a block
router.get('/', getBlocks); // GET API to fetch all blocks
router.get('/:id', getBlockById); // GET API to fetch a block by ID


export default router;