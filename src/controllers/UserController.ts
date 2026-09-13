import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UserResponseDto } from '../dtos/UserResponseDto';

export class UserController {
    constructor(private userService: UserService) {};
    
    async createUser(req: Request, res: Response): Promise<Response> {
        const createUserDto: CreateUserDto = req.body;

        const responseUserDto: UserResponseDto = await this.userService.createUser(createUserDto);

        return res.status(201).json(responseUserDto);
    };

    async getMe(req: Request, res: Response): Promise<Response> {
        const userId = req.user!.sub;

        const responseUserDto: UserResponseDto = await this.userService.getUserById(userId);

        return res.status(200).json(responseUserDto);
    };
};