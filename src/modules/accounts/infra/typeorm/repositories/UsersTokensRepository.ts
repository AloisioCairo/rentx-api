// Capítulo 5 > Trabalhanco com refresh_token e e-mail > Autenticação > Repositório de Refresh token
import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UsersTokens } from "../entities/UsersTokens";

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UsersTokens>;

    constructor() {
        this.repository = getRepository(UsersTokens);
    }

    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UsersTokens> {
        const usersToken = this.repository.create({
            expires_date, refresh_token, user_id
        });

        await this.repository.save(usersToken);

        return usersToken;
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens> {
        const usersTokens = await this.repository.findOne({
            user_id, refresh_token
        });

        return usersTokens;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export { UsersTokensRepository }