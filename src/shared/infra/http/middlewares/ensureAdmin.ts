//	Capitulo 4 > Testes e regras de negócio > Carros > Criando middleware de administrador

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction } from "express";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    const { id } = request.user;

    const userRepository = new UsersRepository();
    const user = await userRepository.findById(id);

    if (!user.isAdmin) {
        throw new AppError("User isn't admin!");
    }

    return next();
}