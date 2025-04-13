import express from 'express';
import { uploadImage } from '../controllers/uploads3';

const router = express.Router();

// Route to upload images
router.post('/upload', uploadImage);

export default router;