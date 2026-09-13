import { UserRepository } from '../repositories/UserRepository';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UserResponseDto } from '../dtos/UserResponseDto';
import { hashPassword } from '../utils/PasswordHash';
import { AppError } from '../error/AppError';

export class UserService {

    constructor(private userRepository = UserRepository) {}

    async createUser(data: CreateUserDto): Promise<UserResponseDto> {
        const existEmail = await this.userRepository.findByEmail(data.email);
        if (existEmail) {
            throw new AppError('Já existe um usuário cadastrado com esse email', 409);
        };

        const hashedPassword = await hashPassword(data.password);

        const newUser = await this.userRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role
        });

        const savedUser = await this.userRepository.save(newUser);

        const responseUser: UserResponseDto = {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            role: savedUser.role!,
            createdAt: savedUser.createdAt
        };

        return responseUser;
    };

    async getUserById(id: string): Promise<UserResponseDto> {
        const existId = await this.userRepository.findById(id);
        if (!existId) {
            throw new AppError('Usuário não encontrado', 404);
        };

        const responseUserId: UserResponseDto = {
            id: existId.id,
            name: existId.name,
            email: existId.email,
            role: existId.role!,
            createdAt: existId.createdAt
        };

        return responseUserId;
    };
};