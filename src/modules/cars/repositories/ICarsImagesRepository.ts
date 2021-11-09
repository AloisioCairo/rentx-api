// Capítulo 4 > Testes e regras de negócio > Carros > Criando migration de imagens de carro
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";

interface ICarsImagesRepository {
    create(car_id: string, image_name: string): Promise<CarImage>
}

export { ICarsImagesRepository }