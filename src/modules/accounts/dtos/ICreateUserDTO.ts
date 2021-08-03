// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Usuário > Criando repositório de usuário

interface ICreateUserDTO {
    name: string;
    password: string;
    email: string;
    driver_license: string;
    id?: string; // Capítulo 3 > Continuando a aplicação > Avatar do usuário > Upload do avatar
    avatar?: string; // Capítulo 3 > Continuando a aplicação > Avatar do usuário > Upload do avatar
}

export { ICreateUserDTO }