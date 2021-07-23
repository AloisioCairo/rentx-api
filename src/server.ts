import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";
import "./database"; // Importação do banco de dados
import { router } from "./routes"

const app = express();

app.use(express.json());

// Rota que apresenta a documentação da API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router);

app.listen(3333, () => console.log("Server is running!"));