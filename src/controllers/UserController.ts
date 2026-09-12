import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { ResponseUserDto } from '../dtos/ResponseUserDto';

export class UserController {
    constructor(private userService: UserService) {};
    
    async createUser(req: Request, res: Response): Promise<Response> {
        const createUserDto: CreateUserDto = req.body;

        const responseUserDto: ResponseUserDto = await this.userService.createUser(createUserDto);

        return res.status(201).json(responseUserDto);
    };
};