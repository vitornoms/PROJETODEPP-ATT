const connection = require('../config/db');
 
async function storeUser(request, response) {
    //recupera os dados do form
    const params = Array(
        request.body.nome,
       // request.body.usuario,
        request.body.senha
    );
   
    //comando no banco
    const query = "INSERT INTO users(name, password) VALUES(?,?)";
 
    connection.query(query, params, (err, results) => {
        console.log(err, results)
        if (results)  {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Cadastro Realizado Com Sucesso!",
                    data: results
                })
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Sem sucesso!",
                data: err
            })  
        }
    })
}
 
module.exports = {
    storeUser
}