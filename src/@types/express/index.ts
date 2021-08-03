// Capítulo 3 > Continuando a aplicação > Avatar do usuário > Adicionando coluna de avatar

// Sobescreve o arquivo "index" do express para permitir salvar no request o "id" do usuário logado.
//     O "id" está sendo preenchido no arquivo src / middlewares / ensureAuthenticated.ts
declare namespace Express {
    export interface Request {
        user: {
            id: string;
        };
    }
}