import jwt from 'jsonwebtoken';
// Middleware to authenticate JWT
export const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        res.status(401).json({ message: 'Access Denied: No token provided' });
        return;
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Access Denied: Token missing' });
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err || !decoded || typeof decoded === 'string' || !decoded.username) {
            res.status(403).json({ message: 'Invalid or expired token' });
            return;
        }
        req.user = decoded; // Ensure `req.user` has `username`
        next();
    });
};
