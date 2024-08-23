let btn = document.querySelector('.fa-eye') // Seleciona o elemento com a classe 'fa-eye', que provavelmente é um ícone de olho, usado para mostrar/ocultar a senha.

btn.addEventListener('click', () => { // Adiciona um evento de clique ao ícone selecionado.
  let inputSenha = document.querySelector('#senha') // Seleciona o campo de entrada da senha pelo ID 'senha'.
  
  if(inputSenha.getAttribute('type') == 'password'){ // Verifica se o tipo do campo de senha é 'password' (senha oculta).
    inputSenha.setAttribute('type', 'text') // Se for 'password', muda para 'text' (senha visível).
  } else {
    inputSenha.setAttribute('type', 'password') // Se for 'text', muda de volta para 'password' (senha oculta).
  }
})

async function entrar() { // Define uma função assíncrona chamada 'entrar' para lidar com o processo de login.
  let email = document.querySelector('#email').value // Obtém o valor do campo de entrada de email.
  let senha = document.querySelector('#senha').value // Obtém o valor do campo de entrada de senha.
  let data = {email, senha} // Cria um objeto contendo o email e a senha.

  const response = await fetch('http://localhost:3000/api/login', { // Envia uma requisição POST para a API de login.
    method: "POST", // Define o método da requisição como POST.
    headers: {"Content-type": "application/json;charset=UTF-8"}, // Define o cabeçalho da requisição para indicar que o corpo da requisição está em formato JSON.
    body: JSON.stringify(data) // Converte o objeto 'data' em uma string JSON e o envia como corpo da requisição.
  });

  let content = await response.json(); // Converte a resposta da API em um objeto JSON.

  if (content.success){ // Verifica se o login foi bem-sucedido (baseado na resposta da API).
    localStorage.setItem('token', content.token) // Se o login for bem-sucedido, armazena o token recebido no localStorage.
    alert('Login realizado com sucesso') // Exibe um alerta informando que o login foi realizado com sucesso.
    window.location.href = 'index.html'; // Redireciona o usuário para a página principal.
  } else {
    alert('Falha no login') // Se o login falhar, exibe um alerta informando o erro.
  }
}

document.getElementById('btnConfirm').addEventListener('click', entrar) // Adiciona um evento de clique ao botão de confirmação (provavelmente o botão de login), que chama a função 'entrar' ao ser clicado.
