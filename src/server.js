// Módulo de inicialização do servidor web onde nossa web API estará hospedada

// Importa o arquivo 'app', que contém a configuração e os middlewares do servidor Express
const app = require('./app');

// Importa a porta configurada no aplicativo Express
const port = app.get('port');


const express = require('express')
const cors = require('cors')
require('dotenv').config()
const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API de Tarefas",
            version: "1.0.0",
            description: "API CRUD para gerenciar tarefas",
        },
        servers: [{ url: "http://localhost:3000"}],
    },
    apis: [`${__dirname}/routes/*.js`], // caminho para as rotas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(express.json())
app.use(cors())

app.listen(port, () => console.log(`Run on port ${port}!`))