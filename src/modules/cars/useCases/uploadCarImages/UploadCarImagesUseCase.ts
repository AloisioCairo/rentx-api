// Capítulo 4 > Testes e regras de negócio > Carros > Criando migration de imagens de carro
// Capítulo 4 > Testes e regras de negócio > Carros > Caso de uso do cadastro de imagens do carro
import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private carsImagesRepository: ICarsImagesRepository
    ) { }

    async execute({ car_id, images_name }: IRequest): Promise<void> {
        images_name.map(async (image) => {
            console.log("execute")
            await this.carsImagesRepository.create(car_id, image);
        })
    }
}

export { UploadCarImagesUseCase }