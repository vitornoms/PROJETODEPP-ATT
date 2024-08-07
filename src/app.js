// Módulo de configuração e aplicação da webapi
 
// Importar pacote express (servidor)
const express = require('express');
// Importar pacote dotenv, gerenciador de variáveis de ambiente
const cors = require('cors');
const dotenv = require('dotenv').config();
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
 
const usersRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter');
const taskRouter = require('./routes/taskRouter');
 
// Instanciar o express na variável app
const app = express();
// Setar a porta do servidor, a partir do arquivo .env ou assumir 3000
app.set('port', process.env.PORT || 3000)
 
app.use(express.json());
app.use(cors());
app.use(fileUpload());
 
app.use('/uploads', express.static(path.join(__dirname, "uploads")))
app.use('/api', usersRouter);
app.use('/api', loginRouter);
app.use('/api', taskRouter);
 
module.exports = app;