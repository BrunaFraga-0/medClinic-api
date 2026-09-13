import { AuthService } from "../services/AuthService";
import { Request, Response } from 'express';
import { LoginDto } from "../dtos/LoginDto";
import { LoginResponseDto } from "../dtos/LoginResponseDto";


export class AuthController {
    constructor(private authService: AuthService) {};

    async login(req: Request, res: Response) {
        const loginDto: LoginDto = req.body;

        const response: LoginResponseDto = await this.authService.login(loginDto);

        return res.status(200).json(response);
    }
};