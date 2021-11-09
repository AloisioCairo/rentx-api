//	Capitulo 4 > Testes e regras de negócio > Carros > Estruturando a entidade de carros
import { Router } from "express";
import multer from "multer";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarControlle";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationControlle";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import uploadConfig from "@config/upload";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();


const upload = multer(uploadConfig.upload("./tmp/car"));

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

// Capítulo 4 > Testes e regras de negócio > Carros > Continuação da listagem de carros disponíveis
carsRoutes.get("/available", listAvailableCarsController.handle);

// Capítulo 4 > Testes e regras de negócio > Carros > Finalizando CreateCarSpecificationUseCase
carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);

// Capítulo 4 > Testes e regras de negócio > Carros > Caso de uso do cadastro de imagens do carro
carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarImagesController.handle);

export { carsRoutes }


