import { UserRepository } from '../repositories/UserRepository';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { ResponseUserDto } from '../dtos/ResponseUserDto';
import { hashPassword } from '../utils/PasswordHash';

export class UserService {

    constructor(private userRepository = UserRepository) {}

    async createUser(data: CreateUserDto): Promise<ResponseUserDto> {
        const existEmail = await this.userRepository.findByEmail(data.email);
        if (existEmail) {
            throw new Error('Já existe um usuário com esse email');
        };

        const hashedPassword = await hashPassword(data.password);

        const newUser = await this.userRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role
        });

        const savedUser = await this.userRepository.save(newUser);

        const responseUser: ResponseUserDto = {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            role: savedUser.role!,
            createdAt: savedUser.createdAt
        };

        return responseUser;
    };
};