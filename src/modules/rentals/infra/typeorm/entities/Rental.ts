//  Capítulo 4 > Testes e regras de negócio > Aluguel > Criando os testes do aluguel
import { v4 as uuidv4 } from "uuid";

class Rental {
    id: string;

    car_id: string;

    user_id: string;

    start_date: Date;

    end_data: Date;

    expect_return_date: Date;

    total: number;

    created_at: Date;

    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export { Rental }