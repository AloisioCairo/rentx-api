// Capítulo 4 > Testes e regras de negócio > Aluguel > Criando controller   > 09:00 mm
import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/Implementations/EtherealMailProvider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
)

// Capítulo 5 > Trabalhando com refreshtoken e e-mail > Recuperação de senha > Criando o provider de e-mail
container.registerInstance<IMailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvider()
)