//  Capítulo 4 > Testes e regras de negócio > Aluguel > Criando os testes do aluguel
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalRepositoryInMemory implements IRentalsRepository {

    rentals: Rental[] = [];

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
    }

    //  Capítulo 4 > Testes e regras de negócio > Aluguel > Continuação do cadastro de aluguel
    async create({ car_id, expected_return_date, user_id }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            car_id,
            expected_return_date,
            user_id,
            start_date: new Date(),
        });

        this.rentals.push(rental);

        return rental;
    }

    // Capítulo 5 > Trabalhando com refresh_token e e-mail > Carro > Correção dos testes
    async findById(id: string): Promise<Rental> {
        return this.rentals.find((rental) => rental.id === id);
    }

    // Capítulo 5 > Trabalhando com refresh_token e e-mail > Carro > Correção dos testes
    async findByUser(user_id: string): Promise<Rental[]> {
        return this.rentals.filter((rental) => rental.user_id === user_id);
    }
}

export { RentalRepositoryInMemory }