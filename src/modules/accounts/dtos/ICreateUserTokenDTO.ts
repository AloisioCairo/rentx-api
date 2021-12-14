// Capítulo 5 > Trabalhanco com refresh_token e e-mail > Autenticação > Repositório de Refresh token
interface ICreateUserTokenDTO {
    user_id: string;
    expires_date: Date;
    refresh_token: string;
}

export { ICreateUserTokenDTO }