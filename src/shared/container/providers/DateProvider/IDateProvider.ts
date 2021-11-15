// Capítulo 4 > Testes e regras de negócio > Aluguel > Criando provider para data
interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number;
    convertToUTC(date: Date): string;
    dateNow(): Date;
}

export { IDateProvider }