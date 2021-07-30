// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Usuário > Criando repositório de usuário

interface ICreateUserDTO {
    name: string;
    password: string;
    email: string;
    driver_license: string;
}

export { ICreateUserDTO }