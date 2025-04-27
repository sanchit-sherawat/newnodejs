import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Role from '../models/Role';

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password, roles } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRoles = roles || ['user']; // Default role
    const newUser = await User.create({ username, email, password: hashedPassword, roles: userRoles });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

// export const loginUser = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'Error logging in' });
//   }
// };

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })
      .select('+password') // Include password for comparison
      .populate('roles'); // Populate roles to include role details

    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

    // Exclude password from the user object in the response
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles, // This will now include the populated role details
    };

    res.status(200).json({ token, user: userData });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in', details: (error as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, password, roles } = req.body;

  try {
    const updateData: any = { username, email, roles };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

export const getUserDetails = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude the password field
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user details', details: (error as Error).message });
  }
};
