//  Capítulo 4 > Testes e regras de negócio > Aluguel > Continuação do cadastro de aluguel
interface ICreateRentalDTO {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
    id?: string;
    end_date?: Date;
    total: number;
}

export { ICreateRentalDTO }