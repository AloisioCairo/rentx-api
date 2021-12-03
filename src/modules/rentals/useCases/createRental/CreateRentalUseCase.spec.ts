// Capítulo 4 > Testes e regras de negócio > Aluguel > Criando os testes do aluguel
import dayjs from "dayjs";

import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryImMemory: RentalRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory; // Capítulo 5 > Trabalhanco com refresh_token e e-mail > Carro > Corrigindo o status de um carro

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate(); // Armazena + 1 dia no dia atual

    beforeEach(() => {
        rentalsRepositoryImMemory = new RentalRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryImMemory, dayjsDateProvider, carsRepositoryInMemory);
    })

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    //  Capítulo 4 > Testes e regras de negócio > Aluguel > Continuação do cadastro de aluguel
    it("should not be able to create a new rental if there is another  open to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    //  Capítulo 4 > Testes e regras de negócio > Aluguel > Continuação do cadastro de aluguel
    it("should not be able to create a new rental if there is another  open to the same car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "test",
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCase.execute({
                user_id: "321",
                car_id: "test",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    // Capítulo 4 > Testes e regras de negócio > Aluguel > Trabalhando com datas com dayjs
    it("should not be able to create a new rental with invalid return time", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "321",
                car_id: "test",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
})