// 1. Capitulo 2 > Iniciando a API > Continuação da aplicação > Criando repositório de especificação
import { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {
    create({ name, description }: ICreateSpecificationDTO): void;

    findByName(name: string): Specification;
}

export { ISpecificationRepository, ICreateSpecificationDTO };