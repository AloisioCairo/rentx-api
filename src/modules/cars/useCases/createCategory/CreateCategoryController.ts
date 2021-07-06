// 1.	Capitulo 2 > Iniciando a API > Continuação da aplicação > Criando os Use Case de Categoria
import { Request, Response } from 'express';
import { CreateCategoryUseCase } from './CreateCategoryUserCase';

class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) { }

    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;

        this.createCategoryUseCase.execute({ name, description });

        return response.status(201).send();
    }
}

export { CreateCategoryController }