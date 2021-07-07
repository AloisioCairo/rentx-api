// 1.	Capitulo 2 > Iniciando a API > Continuação da aplicação > Criando os Use Case de Categoria
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const specificationsRepository = new SpecificationsRepository();

const createSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepository);

const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);

export { createSpecificationController }