// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Usuário > Criando controller de usuário
import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handle);

export { usersRoutes }