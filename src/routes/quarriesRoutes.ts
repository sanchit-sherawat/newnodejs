import express from 'express';
import { createQuarry, getQuarries, getQuarryById } from '../controllers/quarriesController';

const router = express.Router();

router.post('/', createQuarry); // POST API to create a quarry
router.get('/', getQuarries); // GET API to fetch all quarries
router.get('/:id', getQuarryById); // GET API to fetch a quarry by ID

export default router;