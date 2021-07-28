// 1.	Capitulo 2 > Iniciando a API > Continuação da aplicação > Criando os Use Case de Categoria
import { Request, Response } from 'express';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Injeção de dependência
import { container } from "tsyringe";

class CreateCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        // Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Injeção de dependência
        const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

        await createCategoryUseCase.execute({ name, description });

        return response.status(201).send();
    }
}

export { CreateCategoryController }