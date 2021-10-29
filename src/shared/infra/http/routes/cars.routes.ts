//	Capitulo 4 > Testes e regras de negócio > Carros > Estruturando a entidade de carros
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarControlle";
import { Router } from "express";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post("/", createCarController.handle);

export { carsRoutes }