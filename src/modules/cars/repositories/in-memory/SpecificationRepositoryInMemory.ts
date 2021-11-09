// Capítulo 4 > Testes e regras de negócio > Carros > Continuação dos CreateCarSpecificationUseCase
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specification[] = [];

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            description,
            name,
        });

        this.specifications.push(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find((specification) => specification.name === name);
    }

    async findByIds(ids: String[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter((specification) => ids.includes(specification.id));

        return allSpecifications;
    }
}

export { SpecificationRepositoryInMemory }