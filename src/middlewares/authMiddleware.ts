import { Request, Response, NextFunction } from 'express';
import { verificarToken, TokenPayload } from '../utils/jwt';
import { AppError } from '../error/AppError';

declare global {
    namespace Express {
        interface Request {
            usuario?: TokenPayload;
        }
    }
};

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        throw new AppError('Token não fornecido', 401);
    };

     const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token){
        throw new AppError('Token mal formatado', 401); 
    };

    try{
        const payload = verificarToken(token);
        req.usuario = payload;
        return next();

    }catch(err){
        throw new AppError('Token inválido ou expirado', 401);
    };   
};