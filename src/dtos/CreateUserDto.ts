import { IsString, IsEmail, IsEnum, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { UserRole } from '../entities/User';

export class CreateUserDto {
    @IsNotEmpty({ message: 'O campo "name" é obrigatório'})
    @IsString()
    @MaxLength(100)
    name!: string;

    @IsNotEmpty({ message: 'O campo "email" é obrigatório'})
    @IsEmail()
    @MaxLength(255)
    email!: string;

    @IsNotEmpty({ message: 'O campo "password" é obrigatório'})
    @IsString()
    @MaxLength(255)
    password!: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
};