import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { UserRole } from '../entities/User';

const adminRoutes = Router();

adminRoutes.get(
    '/admin/ping', 
    authMiddleware,
    roleMiddleware(UserRole.ADMIN),
    (_req, res) => {
        return res.status(200).json({ message: 'Acesso autorizado' });
    });

export default adminRoutes;