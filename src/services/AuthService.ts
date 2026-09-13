import { LoginDto } from '../dtos/LoginDto';
import { UserRepository } from '../repositories/UserRepository';
import { comparePassword } from '../utils/PasswordHash';
import { gerarToken } from '../utils/jwt';
import { AppError } from '../error/AppError';
import { LoginResponseDto } from '../dtos/LoginResponseDto';

export class AuthService {

    constructor(private userRepository = UserRepository) {};

    async login(data: LoginDto): Promise<LoginResponseDto> {
        try{

            const user = await this.userRepository.findByEmail(data.email);
            if (!user) {
                throw new AppError('Credenciais inválidas', 401);
            };
            
            const isPasswordValid = await comparePassword(data.password, user.password);

            if (!isPasswordValid) {
                throw new AppError('Credenciais inválidas', 401);
            };

            const token = gerarToken({ sub: user.id, role: user.role! });

            const response: LoginResponseDto = {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role!
                }
            };

            return response;

        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            };

            throw new AppError('Erro interno ao realizar login', 500);
        };
    };
};