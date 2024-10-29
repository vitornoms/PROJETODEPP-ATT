// Importa o módulo de conexão com o banco de dados
const connection = require('../config/db');

// Função assíncrona que lida com o processo de login
async function login(request, response) {
    
    // Extrai o e-mail do corpo da requisição
    const email = request.body.email;
 
    // Define a consulta SQL para selecionar o e-mail e a senha do usuário na tabela 'users'
    const query = "SELECT id, email, password FROM users WHERE email = ?";
 
    // Executa a consulta SQL utilizando o e-mail fornecido como parâmetro
    connection.query(query, email, (err, results) => {
        console.log(email)  // Exibe o e-mail no console para depuração
        console.log(results)  // Exibe os resultados da consulta no console para depuração

        // Verifica se a consulta retornou algum resultado
        if(results.length > 0) {
            // Extrai a senha fornecida na requisição
            const password = request.body.senha;
            // Extrai a senha armazenada no banco de dados
            const passwordQuery = results[0].password;

            // Compara a senha fornecida com a senha armazenada no banco de dados
            if (password == passwordQuery) {
                // Se as senhas coincidirem, envia uma resposta de sucesso
                response
                    .status(200)  // Define o status HTTP como 200 (OK)
                    .json({
                        success: true,  // Indica sucesso na resposta
                        message: "Sucesso",  // Mensagem de sucesso
                        data: results  // Inclui os dados retornados na resposta
                    })  
            } else {
                // Se as senhas não coincidirem, envia uma resposta de erro
                response
                    .status(400)  // Define o status HTTP como 400 (Bad Request)
                    .json({
                        success: false,  // Indica falha na resposta
                        message: "Senha incorreta",  // Mensagem de erro para senha incorreta
                        data: results  // Inclui os dados retornados na resposta
                    })
            }
        } else {
            // Se o e-mail não for encontrado no banco de dados, envia uma resposta de erro
            response
                .status(400)  // Define o status HTTP como 400 (Bad Request)
                .json({
                    success: false,  // Indica falha na resposta
                    message: "Email Não Cadastrado!",  // Mensagem de erro para e-mail não cadastrado
                    data: err  // Inclui o erro (se houver) na resposta
                })
        }
    })
}

// Exporta a função 'login' para que possa ser utilizada em outros módulos
module.exports = {
    login
}
