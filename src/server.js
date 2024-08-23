// Módulo de inicialização do servidor web onde nossa web API estará hospedada

// Importa o arquivo 'app', que contém a configuração e os middlewares do servidor Express
const app = require('./app');

// Importa a porta configurada no aplicativo Express
const port = app.get('port');

// Inicia o servidor Express na porta especificada e exibe uma mensagem de confirmação no console quando o servidor estiver em execução
app.listen(port, () => console.log(`Rodando na porta ${port}!`));
