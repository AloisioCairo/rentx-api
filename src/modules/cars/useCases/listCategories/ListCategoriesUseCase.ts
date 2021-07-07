// 1.	Capitulo 2 > Iniciando a API > Continuação da aplicação > Refatorando a listagem de categoria
import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class ListCategoriesUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) { }

    execute(): Category[] {
        const categories = this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoriesUseCase };