// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Usuário > Tratamento de exceções
// Classe responsável pela customização dos erros
export class AppError {
    public readonly message: string;

    public readonly statusCode: number;

    // 400 é o código de erro padrão, quando não é passado o código por parâmetro
    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}