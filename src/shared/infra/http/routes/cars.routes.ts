//	Capitulo 4 > Testes e regras de negócio > Carros > Estruturando a entidade de carros
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarControlle";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

export { carsRoutes }