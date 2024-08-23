// Módulo de configuração e aplicação da web API

// Importa o pacote 'express', que é um framework para criar servidores web em Node.js
const express = require('express');

// Importa o pacote 'cors', que lida com a política de compartilhamento de recursos entre origens diferentes
const cors = require('cors');

// Importa o pacote 'dotenv' e carrega as variáveis de ambiente a partir de um arquivo .env
const dotenv = require('dotenv').config();

// Importa os módulos 'path' e 'fs', que fornecem utilitários para manipulação de caminhos de arquivos e sistema de arquivos, respectivamente
const path = require('path');
const fs = require('fs');

// Importa o pacote 'express-fileupload' para lidar com uploads de arquivos em requisições HTTP
const fileUpload = require('express-fileupload');

// Importa os roteadores de usuário, login e tarefas, que definem as rotas para diferentes partes da API
const usersRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter');
const taskRouter = require('./routes/taskRouter');

// Cria uma instância do aplicativo Express
const app = express();

// Configura a porta do servidor. Se a variável de ambiente PORT estiver definida, ela será usada; caso contrário, a porta padrão será 3000
app.set('port', process.env.PORT || 3000)

// Middleware para processar requisições com corpo em formato JSON
app.use(express.json());

// Middleware para permitir requisições de diferentes origens (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware para lidar com uploads de arquivos
app.use(fileUpload());

// Configura o Express para servir arquivos estáticos da pasta 'uploads' quando a URL começar com '/uploads'
app.use('/uploads', express.static(path.join(__dirname, "uploads")))

// Configura as rotas da API
// As rotas definidas em 'usersRouter' serão precedidas por '/api'
app.use('/api', usersRouter);

// As rotas definidas em 'loginRouter' serão precedidas por '/api'
app.use('/api', loginRouter);

// As rotas definidas em 'taskRouter' serão precedidas por '/api'
app.use('/api', taskRouter);

// Exporta a instância do aplicativo Express para que possa ser utilizada em outros módulos, como no arquivo principal de execução do servidor
module.exports = app;
