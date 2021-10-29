//	Capitulo 4 > Testes e regras de negócio > Carros > TDD na prática
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, { name, description, daily_rate, license_plate, fine_amount, brand, category_id });

        this.cars.push(car);

        return car;
    }

    //	Capitulo 4 > Testes e regras de negócio > Carros > Continuando o caso de uso de carros
    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }
}

export { CarsRepositoryInMemory }