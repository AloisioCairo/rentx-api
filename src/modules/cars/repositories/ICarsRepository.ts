//	Capitulo 4 > Testes e regras de negócio > Carros > TDD na prática
import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>; //	Capitulo 4 > Testes e regras de negócio > Carros > Continuando o caso de uso de carros
    findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]>; // Capítulo 4 > Testes e regras de negócio > Carros > Listando carros disponíveis
}

export { ICarsRepository }
