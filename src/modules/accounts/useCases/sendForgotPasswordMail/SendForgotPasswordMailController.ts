// Capítulo 5 > Trabalhando com refreshtoken e e-mail > Recuperação de senha > Criando caso de uso
import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

class SendForgotPasswordMailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        console.log("1111")

        const sendForgotPasswordMailUseCase = container.resolve(SendForgotPasswordMailUseCase);

        await sendForgotPasswordMailUseCase.execute(email);

        return response.send();
    }
}

export { SendForgotPasswordMailController }