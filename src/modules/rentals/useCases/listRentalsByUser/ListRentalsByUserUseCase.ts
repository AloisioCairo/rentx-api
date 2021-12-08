// Capítulo 5 > Trabalhanco com refresh_token e e-mail > Carro > Listagem de alugueis de usuário
import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

@injectable()
class ListRentalsByUserUseCase {
    constructor(
        @inject("RentalsRepository")
        private renstalsRepository: IRentalsRepository
    ) { }

    async execute(user_id: string): Promise<Rental[]> {
        const rentalsByUser = await this.renstalsRepository.findByUser(user_id);

        return rentalsByUser;
    }
}

export { ListRentalsByUserUseCase }