import { IsString, IsEmail, IsEnum, IsNotEmpty, MaxLength, IsOptional, IsStrongPassword } from 'class-validator';
import { UserRole } from '../entities/User';

export class UserRegisterDto {
    @IsNotEmpty({ message: 'O campo "name" é obrigatório'})
    @IsString({ message: 'O campo "name" deve ser um texto' })
    @MaxLength(100, { message: 'O campo "name" deve ter no máximo 100 caracteres' })
    name!: string;

    @IsNotEmpty({ message: 'O campo "email" é obrigatório'})
    @IsEmail({}, { message: 'Informe um email válido. Exemplo: usuario@email.com' })
    @MaxLength(255, { message: 'O campo "email" deve ter no máximo 255 caracteres' })
    email!: string;

    @IsNotEmpty({ message: 'O campo "password" é obrigatório'})
    @IsString({ message: 'O campo "password" deve ser um texto' })
    @IsStrongPassword({}, { message: 'A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, letra minúscula, número e caractere especial'})
    @MaxLength(255, { message: 'O campo "password" deve ter no máximo 255 caracteres' })
    password!: string;

    @IsOptional()
    @IsEnum(UserRole, { message: 'O campo "role" deve ser ADMIN ou ATENDENTE' })
    role?: UserRole;
};