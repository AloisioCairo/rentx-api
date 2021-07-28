import { request, response, Router } from "express";
import multer from "multer";

// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Injeção de dependência
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";

import { listCategoriesController } from "../modules/cars/useCases/listCategories";
import { importCategoryController } from "../modules/cars/useCases/importCategory";


const categoriesRoutes = Router();

// Capitulo 2 > Iniciando a API > Trabalhando com upload  > Criando upload de arquivos
const upload = multer({
    dest: "./tmp",
});

// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Injeção de dependência
const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController.handle(request, response);
})

// Capitulo 2 > Iniciando a API > Trabalhando com upload  > Criando upload de arquivos
//                                     o "single" identifica que só vai receber 1 arquivo por vez  
categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
    importCategoryController.handle(request, response);
});

export { categoriesRoutes }