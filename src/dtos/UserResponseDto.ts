import { UserRole } from '../entities/User';

export class UserResponseDto {
    id!: string;

    name!: string;

    email!: string;

    role!: UserRole;

    createdAt!: Date;
};