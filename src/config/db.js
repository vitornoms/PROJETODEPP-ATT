// mysql: Importa o módulo mysql2, que é uma biblioteca para conectar-se a bancos de dados MySQL.
// dotenv: Carrega variáveis de ambiente a partir de um arquivo .env, permitindo que informações sensíveis, como credenciais do banco de dados, sejam mantidas fora do código-fonte.
const mysql = require('mysql2');
const dotenv = require('dotenv').config();

// mysql.createConnection: Cria uma nova conexão com o banco de dados MySQL utilizando as configurações fornecidas.
// process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_DATABASE: Obtém as configurações do banco de dados a partir das variáveis de ambiente definidas no arquivo .env.
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// connection.connect: Estabelece a conexão com o banco de dados.
// Função de callback:
// Se ocorrer um erro (err), a função throw err lança uma exceção, interrompendo a execução do programa e exibindo o erro.
// Se a conexão for bem-sucedida, uma mensagem "MySql conectado!" é exibida no console.
connection.connect(function(err){
    if(err) {
        throw err;
    } else {
        console.log("MySql conectado!");
    }
});

// Exporta a instância da conexão para que possa ser utilizada em outras partes da aplicação.
module.exports = connection;