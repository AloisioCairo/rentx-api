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

// Capítulo 4 > Testes e regras de negócio > Carros > Criando seed de usuário
export default async (host = "database"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            host,
        })
    );
}