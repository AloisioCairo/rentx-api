// 1.	Capitulo 2 > Iniciando a API > Continuação da aplicação > Criando o service de especificação e separando em modulos
import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (request, response) => {
    return createSpecificationController.handle(request, response);
});

export { specificationsRoutes }