// Capítulo 5 > Trabalhanco com refresh_token e e-mail > Carro > Controller de devolução de carro
import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

class DevolutionRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { id } = request.params;

        const devolutionRetalUseCase = await container.resolve(DevolutionRentalUseCase);

        const rental = await devolutionRetalUseCase.execute({
            id, user_id,
        });

        return response.status(200).json(rental);
    }
}

export { DevolutionRentalController }