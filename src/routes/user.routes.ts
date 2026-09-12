import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { validateDto } from '../middlewares/validate';
import { CreateUserDto } from '../dtos/CreateUserDto';

const userRoutes = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRoutes.post('/users', 
    validateDto(CreateUserDto),
    (req, res) => userController.createUser(req, res));

export default userRoutes;