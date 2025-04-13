import express from 'express';
import { registerUser, loginUser, getUserDetails } from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', authenticate, getUserDetails);

export default router;
