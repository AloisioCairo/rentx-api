// Capítulo 4 > Testes e regras de negócio > Aluguel > Criando provider para data
interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number;
    convertToUTC(date: Date): string;
    dateNow(): Date;
    compareInDays(start_date: Date, end_date: Date): number; // Capítulo 5 > Trabalhanco com refresh_token e e-mail > Carro > Caso de uso de devolução de carro
    addDays(days: number): Date; // Capítulo 5 > Trabalhanco com refresh_token e e-mail > Autenticação > Refatorando autenticação do usuário
}

export { IDateProvider }