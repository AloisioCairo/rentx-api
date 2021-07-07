// 1.	Capitulo 2 > Iniciando a API > Continuação da aplicação > Refatorando a listagem de categoria
import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase"

class ListCategoriesController {
    constructor(private listCategoriesUseCase: ListCategoriesUseCase) { }

    handle(request: Request, response: Response): Response {
        const all = this.listCategoriesUseCase.execute();

        return response.json(all);
    }
}

export { ListCategoriesController }
