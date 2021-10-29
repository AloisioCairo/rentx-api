// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Injeção de dependência
import { request, response, Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/importCategoryController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const categoriesRoutes = Router();

// Capitulo 2 > Iniciando a API > Trabalhando com upload  > Criando upload de arquivos
const upload = multer({
    dest: "./tmp",
});

// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Injeção de dependência
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", ensureAuthenticated, ensureAdmin, createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

// Capitulo 2 > Iniciando a API > Trabalhando com upload  > Criando upload de arquivos
//                                     o "single" identifica que só vai receber 1 arquivo por vez  
categoriesRoutes.post("/import", ensureAuthenticated, ensureAdmin, upload.single("file"), importCategoryController.handle);

export { categoriesRoutes }