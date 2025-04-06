import express from 'express';
import { createRole, getRoles } from '../controllers/roleController';

const router = express.Router();

router.post('/', createRole);
router.get('/', getRoles);

export default router;
