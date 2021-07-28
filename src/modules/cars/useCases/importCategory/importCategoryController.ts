// Capitulo 2 > Iniciando a API > Trabalhando com upload  > Criando use case para importar categorias
import { Request, Response } from 'express';
import { container } from "tsyringe";

import { ImportCategoryUseCase } from './importCategoryUseCase';

class ImportCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;

        // Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Refatorando as especificações
        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

        await importCategoryUseCase.execute(file);
        return response.status(201).send();
    }
}

export { ImportCategoryController }