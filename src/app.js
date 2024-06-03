// Módulo de configuração e aplicação da webapi

// Importar pacote express (servidor)
const express = require('express');
// Importar pacote dotenv, gerenciador de variáveis de ambiente
const dotenv = require('dotenv').config();

// Instanciar o express na variável app
const app = express();

// Setar a porta do servidor, a partir do arquivo .env ou assumir 3005
app.set('port', process.env.PORT || 3005)

module.exports = app;