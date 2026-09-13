import { Request, Response, NextFunction } from "express";
import { UserRole } from "../entities/User";
import { AppError } from "../error/AppError";


export function roleMiddleware(...rolesPermitidas: UserRole[]){
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            throw new AppError('Usuário não autenticado', 401);
        };

        if (!rolesPermitidas.includes(user.role)) {
            throw new AppError('Sem permissão para acessar este recurso', 403);
        };

        next();
    };
};