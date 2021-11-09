// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Injeção de dependência
import { container } from "tsyringe";

import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { CarsImageRepository } from "@modules/cars/infra/typeorm/repositories/CarsImageRepository";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Refatorando as especificações
container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
)

// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Usuário > Criando repositório de usuário
container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

//	Capitulo 4 > Testes e regras de negócio > Carros > Estruturando a entidade de carros
container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
)

// Capítulo 4 > Testes e regras de negócio > Carros > Caso de uso do cadastro de imagens do carro
container.registerSingleton<ICarsImagesRepository>(
    "CarsImagesRepository",
    CarsImageRepository
)