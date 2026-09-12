import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AppError } from '../error/AppError';

export function validateDto (dtoClass: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dto = plainToInstance(dtoClass, req.body);

        const errors = await validate(dto);

        if (errors.length > 0) {
            const validationErrors = 
                errors.map((error) => ({
                    field: error.property,
                    message: Object.values(error.constraints ??{})
                }));

            throw new AppError(
                'Erro de validação', 
                400,
                validationErrors                
            );
        };

        req.body = dto;
        next();
    };
};