// Capítulo 5 > Trabalhanco com refresh_token e e-mail > Autenticação > Repositório de Refresh token
import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UsersTokens } from "../infra/typeorm/entities/UsersTokens";

interface IUsersTokensRepository {
    create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UsersTokens>;
    findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens>;
    deleteById(id: string): Promise<void>;
    findByRefreshToken(refresh_token: string): Promise<UsersTokens>; // Capítulo 5 > Trabalhando com refreshtoken e e-mail > Recuperação de senha > Caso de uso de reset de senha
}

export { IUsersTokensRepository }