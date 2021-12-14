// Capítulo 5 > Trabalhanco com refresh_token e e-mail > Autenticação > Controller refresh token
import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
    async handle(request: Request, response: Response): Promise<Response> {
        const token = request.body.token || request.headers["x_access-token"] || request.query.token;

        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

        const refresh_token = await refreshTokenUseCase.execute(token);

        return response.json(refresh_token);
    }

}

export { RefreshTokenController }