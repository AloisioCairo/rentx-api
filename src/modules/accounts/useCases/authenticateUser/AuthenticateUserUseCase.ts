// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Usuário > Criando token do usuário
import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        // Verifica se o usuário existe
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect.");
        }

        // Verifica se a senha está correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect.");
        }

        // aloisioignitenode
        const token = sign({}, "d5e3725daf2292c779f95ca4afd4da3b", {
            subject: user.id, // ID do usuário que está gerando o token
            expiresIn: "1d" // Tempo de expiração do token
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            }
        }

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase }