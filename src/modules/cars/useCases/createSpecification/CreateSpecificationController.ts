// 1.	Capitulo 2 > Iniciando a API > Continuação da aplicação > Criando use case de especificação
import { Request, Response } from 'express';

// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Refatorando as especificações
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;

        // Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Refatorando as especificações
        const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);

        createSpecificationUseCase.execute({ name, description });

        return response.status(201).send();
    }
}

export { CreateSpecificationController }