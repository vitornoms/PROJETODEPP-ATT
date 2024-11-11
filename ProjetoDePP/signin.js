let btn = document.querySelector('.fa-eye'); // Seleciona o elemento com a classe 'fa-eye', usado para mostrar/ocultar a senha.

btn.addEventListener('click', () => { // Adiciona um evento de clique ao ícone selecionado.
  let inputSenha = document.querySelector('#senha'); // Seleciona o campo de entrada da senha pelo ID 'senha'.
  
  if (inputSenha.getAttribute('type') == 'password') { // Verifica se o tipo do campo de senha é 'password' (senha oculta).
    inputSenha.setAttribute('type', 'text'); // Se for 'password', muda para 'text' (senha visível).
  } else {
    inputSenha.setAttribute('type', 'password'); // Se for 'text', muda de volta para 'password' (senha oculta).
  }
});

async function entrar() { // Define uma função assíncrona chamada 'entrar' para lidar com o processo de login.
  let email = document.querySelector('#email').value; // Obtém o valor do campo de entrada de email.
  let senha = document.querySelector('#senha').value; // Obtém o valor do campo de entrada de senha.
  let data = { email, senha }; // Cria um objeto contendo o email e a senha.

  const response = await fetch('http://localhost:3000/api/login', { // Envia uma requisição POST para a API de login.
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data)
  });

  let content = await response.json(); // Converte a resposta da API em um objeto JSON.
  console.log(content.data);

  if (content.success) { // Verifica se o login foi bem-sucedido (baseado na resposta da API).
    localStorage.setItem('token', content.token); // Se o login for bem-sucedido, armazena o token recebido no localStorage.
    let userData = JSON.parse(content.data)[0]; // Acessa o primeiro item do array e converte para objeto JSON
    localStorage.setItem('userdata', JSON.stringify(userData));// Armazena o objeto 'content' como string JSON no localStorage.
    console.log(userData);
    alert('Login realizado com sucesso');
    window.location.href = 'index.html'; // Redireciona o usuário para a página principal.
  } else {
    alert('Falha no login'); // Se o login falhar, exibe um alerta informando o erro.
  }
}

document.getElementById('btnConfirm').addEventListener('click', entrar); // Adiciona um evento de clique ao botão de confirmação, que chama a função 'entrar' ao ser clicado.
