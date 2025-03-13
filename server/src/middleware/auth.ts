import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload as JWTDecodedPayload, VerifyErrors } from 'jsonwebtoken';

// Define a custom JwtPayload with the required username field
interface JwtPayload extends JWTDecodedPayload {
  username: string;
}

// Extend Request type to include `user`
interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

// Middleware to authenticate JWT
export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
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

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: VerifyErrors | null, decoded: JWTDecodedPayload | string | undefined) => {
      if (err || !decoded || typeof decoded === 'string' || !(decoded as JwtPayload).username) {
        res.status(403).json({ message: 'Invalid or expired token' });
        return;
      }

      req.user = decoded as JwtPayload; // Ensure `req.user` has `username`
      next();
    }
  );
};
