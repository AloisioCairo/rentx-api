// 1.	Capitulo 2 > Iniciando a API > Continuação da aplicação > Criando os Use Case de Categoria
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Refatorando o caso de uso de categoria
export default (): CreateCategoryController => {
    const categoriesRepository = new CategoriesRepository();

    const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

    const createCategoryController = new CreateCategoryController(createCategoryUseCase);

    return createCategoryController;
}