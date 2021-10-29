// 1. Capitulo 2 > Iniciando a API > S.O.L.I.D > Utilizando princípio de responsabilidade única (SRP)
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Injeção de dependência
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    description: string;
}

@injectable() // Informa que essa classe pode ser injetada por outra classe
class CreateCategoryUseCase {
    constructor(
        // A injeção de dependência "@inject()", substituiu substitui a instanciação "new" da classe
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository) {
    }

    async execute({ name, description }: IRequest): Promise<void> {
        const categryAlreadyExists = await this.categoriesRepository.findByName(name);

        if (categryAlreadyExists) {
            throw new AppError("Category already exists!")
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase }