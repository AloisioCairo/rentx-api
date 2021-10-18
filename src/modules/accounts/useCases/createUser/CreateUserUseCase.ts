// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Usuário > Criando repositório de usuário
import { inject, injectable } from "tsyringe";

// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Usuário > Criptografar senha
import { hash } from "bcryptjs";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("User already exists.")
        }

        // Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Usuário > Criptografar senha
        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({ name, email, password: passwordHash, driver_license });
    }
}

export { CreateUserUseCase }