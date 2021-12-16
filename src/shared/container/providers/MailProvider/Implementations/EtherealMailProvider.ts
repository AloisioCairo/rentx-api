// Capítulo 5 > Trabalhando com refreshtoken e e-mail > Recuperação de senha > Criando o provider de e-mail
import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

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

    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        const message = await this.client.sendMail({
            to,
            from: "Rentx <noreplay@rentx.com.br>",
            subject,
            text: body,
            html: body,
        });

        console.log("Message sent: %s", message.messageId);
        console.log("Previwe URL: %s", nodemailer.getTestMessageUrl(message));
    }
}

export { EtherealMailProvider }