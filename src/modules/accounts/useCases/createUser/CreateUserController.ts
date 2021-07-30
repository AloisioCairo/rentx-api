// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Usuário > Criando repositório de usuário
import { container } from "tsyringe"
import { Request, Response } from "express"
import { CreateUserUseCase } from "./createUserUseCase"


// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Usuário > Criando controller de usuário
class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password, driver_license } = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({ name, email, password, driver_license });

        return response.status(201).send();
    }
}

export { CreateUserController }