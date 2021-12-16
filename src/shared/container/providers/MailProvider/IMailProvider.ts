// Capítulo 5 > Trabalhando com refreshtoken e e-mail > Recuperação de senha > Criando o provider de e-mail
interface IMailProvider {
    sendEmail(to: string, subject: string, variables: any, path: string): Promise<void>;
}

export { IMailProvider }