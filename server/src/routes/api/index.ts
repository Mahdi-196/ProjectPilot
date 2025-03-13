import { Router } from 'express';
import authRoutes from '../auth-routes.js';
import { ticketRouter } from '../api/ticket-routes.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tickets', authenticateToken, ticketRouter);

export default router;
