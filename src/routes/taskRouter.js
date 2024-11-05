// Importar apenas o módulo 'Router' do pacote 'express'. O 'Router' é usado para criar um manipulador de rotas moduladores e montaveis.
const { Router } = require('express');

// Criar uma nova instância do 'Router', que será usada para definir as rotas da aplicação.
const router = Router();

// Importar a função 'storeTask' do módulo 'taskController', que contém a lógica para manipulação de tarefas.
// O caminho na linha indica que o módulo está localizado na pasta 'controller'.
const { storeTask, updateTask, deleteTask, getTask } = require('../controller/taskController');

// Definir uma rota para requisições HTTP POST. Quando uma requisição POST é feita para essa rota, a função 'storeTask' é chamada.

/**
 * @swagger
 * /store/task:
 *  post:
 *    summary: Cadastra uma nova tarefa
 *    responses:
 *      200:
 *        description: Sucesso!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */
router.post('/store/task', storeTask);


/**
 * @swagger
 * /update/task/:id:
 *  put:
 *    summary: Atualiza uma tarefa pelo ID
 *    responses:
 *      200:
 *        description: Uma lista de tarefas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */
router.put('/update/task/:id', updateTask);


// Rota para atualizar uma tarefa existente (PUT).
/**
 * @swagger
 * /delete/task/:id:
 *  delete:
 *    summary: Remove uma tarefa pelo ID
 *    responses:
 *      200:
 *        description: Uma lista de tarefas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */
router.delete('/delete/task/:id', deleteTask);


/**
 * @swagger
 * /task:
 *  get:
 *    summary: Retorna todas as tarefas
 *    responses:
 *      200:
 *        description: Uma lista de tarefas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */
router.get('/task', getTask);


// Exportar a instância do 'router' para que ela possa ser usada em outros módulos da aplicação.
module.exports = router;
