// server/src/routes/auth-routes.ts
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
export const login = async (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt:", req.body); // Debug: log incoming credentials
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            console.error("User not found:", username);
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            console.error("Password mismatch for user:", username);
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Generated Token:", token);
        return res.json({ token });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
const router = Router();
router.post('/login', login);
export default router;
