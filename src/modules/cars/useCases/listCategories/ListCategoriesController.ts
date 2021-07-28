// 1.	Capitulo 2 > Iniciando a API > Continuação da aplicação > Refatorando a listagem de categoria
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase"

class ListCategoriesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

        const all = await listCategoriesUseCase.execute();

        return response.json(all);
    }
}

export { ListCategoriesController }
