// Capitulo 2 > Iniciando a API > Trabalhando com upload  > Criando use case para importar categorias
import { Request, Response } from 'express';
import { importCategoryController } from '.';
import { ImportCategoryUseCase } from './importCategoryUseCase';

class ImportCategoryController {
    constructor(private importCategoryUseCase: ImportCategoryUseCase) { }

    handle(request: Request, response: Response): Response {
        const { file } = request;

        this.importCategoryUseCase.execute(file);
        return response.send();
    }
}

export { ImportCategoryController }