// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Usuário > Autenticação nas rotas
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: String;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    // Verifica se o token é válido
    try {
        const { sub: user_id } = verify(token, "d5e3725daf2292c779f95ca4afd4da3b") as IPayload;

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not existis!", 401);
        }

        next();
    } catch {
        throw new AppError("Invalid token!", 401)
    }

}