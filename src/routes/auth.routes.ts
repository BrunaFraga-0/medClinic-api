import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthService } from '../services/AuthService';
import { validateDto } from '../middlewares/validate';
import { LoginDto } from '../dtos/LoginDto';

const authRoutes = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

authRoutes.post('/auth/login',
    validateDto(LoginDto),
    (req, res) => authController.login(req, res));

export default authRoutes;