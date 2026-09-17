import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { UserRegisterDto } from '../dtos/UserRegisterDto';
import { UserResponseDto } from '../dtos/UserResponseDto';

export class UserController {
    constructor(private userService: UserService) {};
    
    async registerUser(req: Request, res: Response): Promise<Response> {
        const registerUserDto: UserRegisterDto = req.body;

        const responseUserDto: UserResponseDto = await this.userService.registerUser(registerUserDto);

        return res.status(201).json(responseUserDto);
    };

    async getMe(req: Request, res: Response): Promise<Response> {
        const userId = req.user!.sub;

        const responseUserDto: UserResponseDto = await this.userService.getUserById(userId);

        return res.status(200).json(responseUserDto);
    };
};