import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { validateDto } from '../middlewares/validate';
import { UserRegisterDto } from '../dtos/UserRegisterDto';
import { authMiddleware } from '../middlewares/authMiddleware';

const userRoutes = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRoutes.post(
    '/users/register', 
    validateDto(UserRegisterDto),
    (req, res) => userController.registerUser(req, res));

userRoutes.get(
    '/users/me',
    authMiddleware,
    (req, res) => userController.getMe(req, res));

export default userRoutes;