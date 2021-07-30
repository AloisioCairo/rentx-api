import express, { NextFunction } from "express";
import "express-async-errors" // Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Usuário > Tratamento de exceções

import swaggerUi from "swagger-ui-express";

import "./database"; // Importação do banco de dados

import "./shared/container"; // Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Injeção de dependência

import { AppError } from "./errors/AppError";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

// Rota que apresenta a documentação da API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router);

// Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Usuário > Tratamento de exceções
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message,
        });
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    })
})

app.listen(3333, () => console.log("Server is running!"));