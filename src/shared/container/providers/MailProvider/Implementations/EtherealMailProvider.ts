// Capítulo 5 > Trabalhando com refreshtoken e e-mail > Recuperação de senha > Criando o provider de e-mail
import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";
import handlebars from "handlebars";
import fs from "fs";

@injectable()
class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then((account) => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            this.client = transporter;
        }).catch((err) => console.log("Erro no contructor EtherealMailProvider. Erro: " + err));
    }

    async sendEmail(to: string, subject: string, variables: any, path: string): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse(variables);

        const message = await this.client.sendMail({
            to,
            from: "Rentx <noreplay@rentx.com.br>",
            subject,
            html: templateHTML,
        });

        console.log("Message sent: %s", message.messageId);
        console.log("Previwe URL: %s", nodemailer.getTestMessageUrl(message));
    }
}

export { EtherealMailProvider }