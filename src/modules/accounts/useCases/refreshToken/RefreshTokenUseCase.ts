// Capítulo 5 > Trabalhanco com refresh_token e e-mail > Autenticação > Criando caso de uso do refresh token
import { verify, sign } from "jsonwebtoken";
import { inject, injectable, singleton } from "tsyringe";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IPayLoad {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ) { }

    async execute(token: string): Promise<ITokenResponse> {
        const { email, sub } = verify(token, auth.secret_refresh_token) as IPayLoad;

        const user_id = sub;

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

        if (!userToken) {
            throw new AppError("Refresh token does not exists!");
        }

        await this.usersTokensRepository.deleteById(userToken.id);

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token,
        });

        const expires_date = this.dateProvider.addDays(auth.expires_in_refresh_token_days);

        await this.usersTokensRepository.create({
            expires_date,
            refresh_token,
            user_id
        });

        const newToken = sign({}, auth.secret_token, {
            subject: user_id, // ID do usuário que está gerando o token
            expiresIn: auth.expires_in_token // Tempo de expiração do token
        });

        return {
            token,
            refresh_token,
        }
    }
}

export { RefreshTokenUseCase }