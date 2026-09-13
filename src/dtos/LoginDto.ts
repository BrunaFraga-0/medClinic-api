import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
    @IsNotEmpty({ message: 'O campo "email" é obrigatório'})
    @IsEmail({}, { message: 'Informe um email válido' })
    email!: string;

    @IsNotEmpty({ message: 'O campo "password" é obrigatório'})
    password!: string;
};