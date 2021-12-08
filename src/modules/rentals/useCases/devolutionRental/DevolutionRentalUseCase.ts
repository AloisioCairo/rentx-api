// Capítulo 5 > Trabalhanco com refresh_token e e-mail > Carro > Caso de uso de devolução de carro
import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ) { }

    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id);
        const minimum_daily = 1;

        if (!rental) {
            throw new AppError("Rental does not exists!");
        }

        // Verificar o tempo do aluguel

        const dateNow = this.dateProvider.dateNow();

        // Retorna a quantidade de diárias do aluguel
        let daily = this.dateProvider.compareInDays(rental.start_date, this.dateProvider.dateNow());

        if (daily <= 0) {
            daily = minimum_daily;
        }

        // Retorna a quantidade de dias em atrasos
        const delay = this.dateProvider.compareInDays(dateNow, rental.expected_return_date);

        let total = 0;

        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase }