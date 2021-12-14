// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Usuário > Autenticação nas rotas
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    const userTokensRepository = new UsersTokensRepository();

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    // Verifica se o token é válido
    try {
        const { sub: user_id } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayload;

        // const usersRepository = new UsersRepository();
        const user = await userTokensRepository.findByUserIdAndRefreshToken(user_id, token);

        if (!user) {
            throw new AppError("User does not existis!", 401);
        }

        // Capítulo 3 > Continuando a aplicação > Avatar do usuário > Adicionando coluna de avatar
        // Após o login, deixa salvo no "id" do "request" para utilizar em partes do sistema. É necessário criar o arquivo na pasta src/@types/express/index.ts
        request.user = {
            id: user_id,
        };

        next();
    } catch {
        throw new AppError("Invalid token!", 401)
    }

}