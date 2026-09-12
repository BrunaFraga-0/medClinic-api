import { UserRole } from '../entities/User';

export class ResponseUserDto {
    id!: string;

    name!: string;

    email!: string;

    role!: UserRole;

    createdAt!: Date;
};