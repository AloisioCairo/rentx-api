// Capítulo 4 > Testes e regras de negócio > Carros > Criando migration de imagens de carro
// Capítulo 4 > Testes e regras de negócio > Carros > Caso de uso do cadastro de imagens do carro
import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
    filename: string;
}

class UploadCarImagesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const images = request.files as IFiles[];

        const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

        const images_name = images.map((file) => file.filename);

        console.log("handle")

        await uploadCarImagesUseCase.execute({
            car_id: id,
            images_name,
        });

        return response.status(201).send();
    }
}

export { UploadCarImagesController }