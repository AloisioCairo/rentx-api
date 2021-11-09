// Capítulo 4 > Testes e regras de negócio > Carros > Finalizando CreateCarSpecificationUseCase
import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./CreateCarSecificationUseCase";

class CreateCarSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);
        const { id } = request.params;
        const { specifications_id } = request.body;

        const cars = await createCarSpecificationUseCase.execute({
            car_id: id, specifications_id
        })

        return response.json(cars);
    }
}

export { CreateCarSpecificationController }