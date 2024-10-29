const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storeTask(request, response) {
    const { title, description } = request.body;
    const params = [title, description];

    const query = "INSERT INTO forum(title, description) VALUES(?, ?)";

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error("Erro ao inserir tarefa:", err);
            return response.status(500).json({
                success: false,
                message: "Erro interno ao inserir a tarefa.",
                sql: err
            });
        }

        const newTaskId = results.insertId; // Pega o ID da nova tarefa inserida
        response.status(201).json({
            success: true,
            message: "Sucesso!",
            data: { id: newTaskId, title, description }
        });
    });
}

async function updateTask(request, response) {
    const { id } = request.params;
    const { title, description } = request.body;

    console.log(`ID recebido: ${id}, Título: ${title}, Descrição: ${description}`); // Log para depuração

    const query = "UPDATE forum SET title = ?, description = ? WHERE id = ?";

    connection.query(query, [title, description, id], (err, results) => {
        if (err) {
            console.error("Erro ao atualizar tarefa:", err); // Log do erro
            return response.status(500).json({
                success: false,
                message: "Erro interno ao atualizar a tarefa.",
                sql: err
            });
        }

        if (results && results.affectedRows > 0) {
            response.status(200).json({
                success: true,
                message: "Tarefa atualizada com sucesso!"
            });
        } else {
            response.status(404).json({
                success: false,
                message: "Tarefa não encontrada ou não atualizada.",
                data: { id }
            });
        }
    });
}

async function deleteTask(request, response) {
    const { id } = request.params;

    const query = "DELETE FROM forum WHERE id = ?";

    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error("Erro ao atualizar tarefa:", err); // Log do erro
            return response.status(500).json({
                success: false,
                message: "Erro interno ao atualizar a tarefa.",
                sql: err
            });
        }

        if (results && results.affectedRows > 0) {
            response.status(200).json({
                success: true,
                message: "Tarefa atualizada com sucesso!"
            });
        } else {
            response.status(404).json({
                success: false,
                message: "Tarefa não encontrada ou não atualizada.",
                data: { id }
            });
        }
    });
}

async function getTask(request, response) {
    const query = "SELECT * FROM forum";

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao buscar tarefas:", err);
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar as tarefas.",
                sql: err
            });
        }

        response.status(200).json({
            success: true,
            data: results
        });
    });
}

async function getTaskById(request, response) {
    const query = "SELECT * FROM forum WHERE id_user = ?";

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao buscar tarefas:", err);
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar as tarefas.",
                sql: err
            });
        }

        response.status(200).json({
            success: true,
            data: results
        });
    });
}


module.exports = {
    storeTask,
    updateTask,
    deleteTask,
    getTask,
    getTaskById
};
