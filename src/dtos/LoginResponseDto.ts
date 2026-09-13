import { UserRole } from '../entities/User';

export class LoginResponseDto {
    token!: string;

    user!: {
        id: string;
        name: string;
        email: string;
        role: UserRole;
    };
};