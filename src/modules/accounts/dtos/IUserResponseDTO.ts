// Capítulo 6 > Deploy > Configuração AWS > Criando URL de acesso do avatar
interface IUserResponseDTO {
    email: string;
    name: string;
    id: string;
    avatar: string;
    driver_license: string;
    avatar_url(): string;
}

export { IUserResponseDTO }