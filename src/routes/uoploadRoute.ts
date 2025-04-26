import express from 'express';
import { deleteFile, uploadDocument, uploadImage } from '../controllers/uploads3';

const router = express.Router();

// Route to upload images
router.post('/', uploadImage);
// Document upload route
router.post('/documents', uploadDocument);

// Delete file route
router.delete('/delete', deleteFile);

export default router;