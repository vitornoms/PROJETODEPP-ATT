const express = require('express');
const router = express.Router();
 
const { login } = require("../controller/loginController")


/**
 * @swagger
 * /login:
 *  post:
 *    summary: Efetua o login do usuário
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
router.post('/login', login);
 
module.exports = router;