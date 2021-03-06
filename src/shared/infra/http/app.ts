import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors" // Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Usuário > Tratamento de exceções

import swaggerUi from "swagger-ui-express";

import * as Sentry from "@sentry/node"; // Capítulo 6 > Deploy > Segurança > Configurando Sentry
import * as Tracing from "@sentry/tracing"; // Capítulo 6 > Deploy > Segurança > Configurando Sentry

import createConnection from "@shared/infra/typeorm"; // Importação do banco de dados

import "@shared/container"; // Capítulo 3 > Continuando a aplicação > Trabalhando com Banco de Dados > Injeção de dependência

import { AppError } from "@shared/errors/AppError";
import { router } from "./routes";
import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";

import swaggerFile from "../../../swagger.json";
import upload from "@config/upload";

createConnection();

const app = express();

app.use(rateLimiter);

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],

    tracesSampleRate: 1.0,
});

// Capítulo 6 > Deploy > Segurança > Configurando Sentry
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

// Rota que apresenta a documentação da API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Capítulo 6 > Deploy > Configuração AWS > Criando URL de acesso do avatar
// Necessário para a aplicação saber que toda vez que na URL tiver "/avatar", é para acessar a pasta "avatar"
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use(Sentry.Handlers.errorHandler());

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

export { app }