// 1. Capitulo 2 > Iniciando a API > Continuação da aplicação > Criando repositório de especificação

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create({ name, description }: ICreateSpecificationDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification>;
    findByIds(ids: string[]): Promise<Specification[]>; // Capítulo 4 > Testes e regras de negócio > Carros > Continuação dos CreateCarSpecificationUseCase
}

export { ISpecificationsRepository, ICreateSpecificationDTO };