//Capítulo 5 > Trabalhando com refreshtoken e e - mail > Testes > Testando o envio de e - mail
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider
        )
    })

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = spyOn(mailProvider, "sendEmail")

        await usersRepositoryInMemory.create({
            driver_license: "664168",
            email: "test@test.com",
            name: "Test",
            password: "1234"
        });

        await sendForgotPasswordMailUseCase.execute("test@test.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("test_etest@test.com")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("should be able to create an user token", async () => {
        const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");

        usersRepositoryInMemory.create({
            driver_license: "6622168",
            email: "test2@test2.com",
            name: "Test2",
            password: "1234"
        });

        await sendForgotPasswordMailUseCase.execute("test2@test2.com");

        expect(generateTokenMail).toBeCalled();
    });
})