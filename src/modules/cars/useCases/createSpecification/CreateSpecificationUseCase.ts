// 1.	Capitulo 2 > Iniciando a API > Continuação da aplicação > Criando o service de especificação e separando em modulos
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private specificationsRepository: ISpecificationRepository) { }

    execute({ name, description }: IRequest): void {
        const specificationAlreadyExists = this.specificationsRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error("Specification already exists!")
        }

        this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase }