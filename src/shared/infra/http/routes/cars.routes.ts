//	Capitulo 4 > Testes e regras de negócio > Carros > Estruturando a entidade de carros
import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarControlle";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

// Capítulo 4 > Testes e regras de negócio > Carros > Continuação da listagem de carros disponíveis
carsRoutes.get("/available", listAvailableCarsController.handle);


export { carsRoutes }


