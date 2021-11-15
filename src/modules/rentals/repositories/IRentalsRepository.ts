//  Capítulo 4 > Testes e regras de negócio > Aluguel > Criando os testes do aluguel
import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findOpenRentalByUser(user_id: string): Promise<Rental>;
    create(data: ICreateRentalDTO): Promise<Rental>; //  Capítulo 4 > Testes e regras de negócio > Aluguel > Continuação do cadastro de aluguel
}

export { IRentalsRepository }