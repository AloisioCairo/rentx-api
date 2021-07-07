// 1.	Capitulo 2 > Iniciando a API > Continuação da aplicação > Criando use case de especificação
import { Request, Response } from 'express';

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
    constructor(private createSpecificationUseCase: CreateSpecificationUseCase) { }

    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;

        this.createSpecificationUseCase.execute({ name, description });

        return response.status(201).send();
    }
}

export { CreateSpecificationController }