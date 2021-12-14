// Capítulo 4 > Testes e regras de negócio > Aluguel > Criando provider para data
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {

    compareInHours(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUTC(end_date);
        const start_date_utc = this.convertToUTC(start_date);

        return dayjs(end_date_utc).diff(start_date_utc, "hours");
    }

    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    dateNow(): Date {
        return dayjs().toDate();
    }

    // Capítulo 5 > Trabalhanco com refresh_token e e-mail > Carro > Caso de uso de devolução de carro
    compareInDays(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUTC(end_date);
        const start_date_utc = this.convertToUTC(start_date);

        return dayjs(end_date_utc).diff(start_date_utc, "days");
    }

    // Capítulo 5 > Trabalhanco com refresh_token e e-mail > Autenticação > Refatorando autenticação do usuário
    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }
}

export { DayjsDateProvider }