// connection: Importa a configuração do banco de dados a partir de um módulo db localizado na pasta config. 
// Isso provavelmente estabelece a conexão com o banco de dados.

// dotenv: Carrega variáveis de ambiente a partir de um arquivo .env para garantir que as configurações sensíveis 
// (como credenciais do banco de dados) sejam mantidas seguras.

const connection = require('../config/db');
const dotenv = require('dotenv').config();


// Esta função é responsável por lidar com a requisição para armazenar uma nova tarefa.
// O uso do async aqui indica que poderíamos utilizar await dentro da função, mas no código fornecido, não há uso de await.
async function storeTask(request, response){
    // Extrai os valores title e description do corpo da requisição (request.body) e os coloca em um array params.
    const params = Array(
        request.body.title,
        request.body.description
    );
// Define a query SQL para inserir uma nova linha na tabela tasks com os valores title e description. Os pontos de interrogação (?) são placeholders que serão substituídos pelos valores reais dos parâmetros.
    const query = "INSERT INTO tasks(title,description) VALUES(?,?)";
// connection.query executa a query SQL com os parâmetros fornecidos. A função de callback recebe dois argumentos: err e results.
// Se results estiver presente (indicando que a query foi bem-sucedida), uma resposta JSON com status 201 (Criado) é enviada ao cliente, incluindo uma mensagem de sucesso e os resultados da operação.
// Se houver um erro (err), uma resposta JSON com status 400 (Requisição Inválida) é enviada, incluindo uma mensagem de erro e os detalhes do erro SQL.
    connection.query(query, params, (err, results) => {
        if(results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Sucesso!",
                data: results
            })
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Ops, deu problema!",
                sql: err
            })
        }
    })
}
// Exporta a função storeTask para que possa ser utilizada em outras partes da aplicação, como no módulo de rotas.
module.exports = {
    storeTask
}