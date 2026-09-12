import { Request, Response, NextFunction } from 'express';
import { AppError } from '../error/AppError';

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err);

    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            errors: err.errors
        });
    };

    return res.status(500).json({
        message:  'Erro interno no servidor.'
    });
};