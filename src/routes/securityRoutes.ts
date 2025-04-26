import { createSecurityCheck, getAllSecurityBlockAdditionalDetails, getBlocksGroupedByTruckNumber } from '../controllers/securityController';
import express from 'express';

const router = express.Router();

router.get('/truck-details', getAllSecurityBlockAdditionalDetails); // GET API to fetch additional details of all blocks
router.get('/blocks-by-truck', getBlocksGroupedByTruckNumber);
router.post('/create-security-check', createSecurityCheck); 

export default router;