// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Instalando o TypeORM
import { Connection, createConnection, getConnectionOptions } from 'typeorm';

// interface IOptions {
//     host: string;
// }

// getConnectionOptions().then(options => {
//     const newOptions = options as IOptions;
//     newOptions.host = 'database'; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
//     createConnection({
//         ...options,
//     });
// });

//  Comentado para a conexão do banco de dados funciona na AWS
// Capítulo 4 > Testes e regras de negócio > Carros > Criando seed de usuário
// export default async (host = "database"): Promise<Connection> => {
//     const defaultOptions = await getConnectionOptions();

//     return createConnection(
//         Object.assign(defaultOptions, {
//             host: process.env.NODE_ENV === "test" ? "localhost" : host, // Capítulo 4 > Testes e regras de negócio > Testes de integração > Criando o primeiro teste de integração
//             database: process.env.NODE_ENV === "test" ? "rentx_test" : defaultOptions.database, // Capítulo 4 > Testes e regras de negócio > Testes de integração > Criando o primeiro teste de integração
//         })
//     );
// }

// Capítulo 6 > Deploy > Deploy > Alterando a configuração do banco de dados
export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection( 
        Object.assign(defaultOptions, {
            database: process.env.NODE_ENV === "test" ? "rentx_test" : defaultOptions.database,
        })
    );
}