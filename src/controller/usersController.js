// Importa o módulo de conexão com o banco de dados
const connection = require('../config/db');

// Função assíncrona que lida com o armazenamento de um novo usuário no banco de dados
async function storeUser(request, response) {
    
    // Recupera os dados enviados pelo formulário na requisição e os armazena em um array
    const params = Array(
        request.body.nome,   // Nome do usuário
        request.body.senha,   // Senha do usuário
        request.body.email  // E-mail do usuário
    );
   
    // Define a consulta SQL para inserir um novo usuário na tabela 'users'
    const query = "INSERT INTO users(name, password, email) VALUES(?,?,?)";
 
    // Executa a consulta SQL, utilizando os parâmetros fornecidos
    connection.query(query, params, (err, results) => {
        // Exibe erros e resultados no console para depuração
        console.log(err, results)
        
        // Verifica se a operação de inserção foi bem-sucedida
        if (results)  {
            // Se bem-sucedida, envia uma resposta de sucesso
            response
                .status(200)  // Define o status HTTP como 200 (OK)
                .json({
                    success: true,  // Indica sucesso na resposta
                    message: "Cadastro Realizado Com Sucesso!",  // Mensagem de sucesso
                    data: results  // Inclui os dados retornados na resposta
                })
        } else {
            // Se houver erro na operação, envia uma resposta de erro
            response
            .status(400)  // Define o status HTTP como 400 (Bad Request)
            .json({
                success: false,  // Indica falha na resposta
                message: "Sem sucesso!",  // Mensagem de erro
                data: err  // Inclui o erro ocorrido na resposta
            })  
        }
    })
}
 
// Exporta a função 'storeUser' para que possa ser utilizada em outros módulos
module.exports = {
    storeUser
}