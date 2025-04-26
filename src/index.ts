import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import roleRoutes from './routes/roleRoutes';
import permissionRoutes from './routes/permissionRoutes';
import connectDB from './config/db';
import blockRoutes from './routes/blockRoutes';
import quarriesRoutes from './routes/quarriesRoutes';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import uploadRoutes from './routes/uoploadRoute';
import licenseRoutes from './routes/LicenseRoutes';
import { authenticate, authorize } from './middlewares/authMiddleware';
import securityRoutes from './routes/securityRoutes';
import blockInspectionRoutes from './routes/blockInspectionRoutes';


dotenv.config();

const app = express();
// Enable CORS
app.use(cors());
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
// Enable file upload
app.use(fileUpload());



// Register routes
app.use('/api/upload', uploadRoutes);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/permissions', permissionRoutes);

// Register routes
app.use('/api/licenses', licenseRoutes);
app.use('/api/blocks', authenticate, authorize(["block_manager"]), blockRoutes);
app.use('/api/security', authenticate, authorize(["security_manager"]), securityRoutes);
app.use('/api/block-inspections', authenticate, authorize(["block_inspector"]), blockInspectionRoutes);

// Add Quarries routes
app.use('/api/quarries', quarriesRoutes);

// Error Handling Middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// MongoDB Connection
connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


