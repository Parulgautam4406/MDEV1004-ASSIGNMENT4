// controllers/auth.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/JwtUtils';
import User from '../model/UserModel';


export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user || !bcrypt.compareSync(password, user.password)) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
  
      const token = generateToken({ userId: user._id });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Login failed' });
    }
  };
  
