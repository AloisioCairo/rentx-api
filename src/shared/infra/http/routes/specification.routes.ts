// 1.	Capitulo 2 > Iniciando a API > Continuação da aplicação > Criando o service de especificação e separando em modulos
import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const specificationsRoutes = Router();

// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Refatorando as especificações
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationController.handle);

export { specificationsRoutes }