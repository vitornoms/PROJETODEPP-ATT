// Seleciona o botão que alterna a visibilidade da senha
let btn = document.querySelector('#verSenha')

// Seleciona o campo de entrada de nome, a label correspondente e inicializa a variável de validação
let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validNome = false

// Seleciona o campo de entrada de e-mail, a label correspondente e inicializa a variável de validação
let email = document.querySelector('#email')
let labelEmail = document.querySelector('#labelEmail')
let validEmail = false

// Seleciona o campo de entrada de senha, a label correspondente e inicializa a variável de validação
let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

// Seleciona os elementos que exibem mensagens de erro e sucesso
let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

// Valida o nome enquanto o usuário digita
nome.addEventListener('keyup', () => {
  if(nome.value.length <= 2){ // Se o nome tiver 2 ou menos caracteres
    labelNome.setAttribute('style', 'color: red') // Muda a cor da label para vermelho
    labelNome.innerHTML = 'Nome *Insira no mínimo 3 caracteres' // Altera o texto da label para exibir o erro
    nome.setAttribute('style', 'border-color: red') // Muda a cor da borda do campo de nome para vermelho
    validNome = false // Define o nome como inválido
  } else {
    labelNome.setAttribute('style', 'color: green') // Muda a cor da label para verde
    labelNome.innerHTML = 'Nome' // Volta o texto da label ao normal
    nome.setAttribute('style', 'border-color: green') // Muda a cor da borda do campo de nome para verde
    validNome = true // Define o nome como válido
  }
})

// Valida o e-mail enquanto o usuário digita
email.addEventListener('keyup', () => {
  if(email.value.length <= 4){ // Se o e-mail tiver 4 ou menos caracteres
    labelEmail.setAttribute('style', 'color: red') // Muda a cor da label para vermelho
    labelEmail.innerHTML = 'Email *Insira no mínimo 5 caracteres' // Altera o texto da label para exibir o erro
    email.setAttribute('style', 'border-color: red') // Muda a cor da borda do campo de e-mail para vermelho
    validEmail = false // Define o e-mail como inválido
  } else {
    labelEmail.setAttribute('style', 'color: green') // Muda a cor da label para verde
    labelEmail.innerHTML = 'Email' // Volta o texto da label ao normal
    email.setAttribute('style', 'border-color: green') // Muda a cor da borda do campo de e-mail para verde
    validEmail = true // Define o e-mail como válido
  }
})

// Valida a senha enquanto o usuário digita
senha.addEventListener('keyup', () => {
  if(senha.value.length <= 5){ // Se a senha tiver 5 ou menos caracteres
    labelSenha.setAttribute('style', 'color: red') // Muda a cor da label para vermelho
    labelSenha.innerHTML = 'Senha *Insira no mínimo 6 caracteres' // Altera o texto da label para exibir o erro
    senha.setAttribute('style', 'border-color: red') // Muda a cor da borda do campo de senha para vermelho
    validSenha = false // Define a senha como inválida
  } else {
    labelSenha.setAttribute('style', 'color: green') // Muda a cor da label para verde
    labelSenha.innerHTML = 'Senha' // Volta o texto da label ao normal
    senha.setAttribute('style', 'border-color: green') // Muda a cor da borda do campo de senha para verde
    validSenha = true // Define a senha como válida
  }
})

// Função para realizar o cadastro do usuário
async function cadastrar() {
  // Verifica se todos os campos são válidos
  if(validNome, validEmail, validSenha){
    // Recupera a lista de usuários do localStorage ou inicializa uma nova lista
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')
    
    // Adiciona o novo usuário à lista
    listaUser.push({
      nomeCad: nome.value,
      emailCad: email.value,
      senhaCad: senha.value
    })
    
    // Armazena a lista atualizada no localStorage
    localStorage.setItem('listaUser', JSON.stringify(listaUser))
    
    // Envia os dados do usuário ao servidor
    let data = {nome: nome.value, email: email.value, senha: senha.value}
    const response = await fetch('http://localhost:3000/api/user/create', {
      method: "POST", // Define o método como POST
      headers: {"Content-type": "application/json;charset=UTF-8"}, // Define o cabeçalho para JSON
      body: JSON.stringify(data) // Converte o objeto 'data' para JSON e o envia como corpo da requisição
    });

    let content = await response.json(); // Converte a resposta do servidor para JSON
    
    if (content.success){ // Se o cadastro for bem-sucedido
      alert('Cadastro realizado com sucesso') // Exibe um alerta de sucesso
      window.location.href = 'signin.html'; // Redireciona para a página de login
    } else {
      alert('Erro ao cadastrar') // Exibe um alerta de erro
    }
    
    // Exibe a mensagem de sucesso
    msgSuccess.setAttribute('style', 'display: block')
    msgSuccess.innerHTML = '<strong>Cadastrando email...</strong>'
    // Esconde a mensagem de erro
    msgError.setAttribute('style', 'display: none')
    msgError.innerHTML = ''
  } else {
    // Se algum campo estiver inválido, exibe a mensagem de erro
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
    // Esconde a mensagem de sucesso
    msgSuccess.innerHTML = ''
    msgSuccess.setAttribute('style', 'display: none')
  }
}

// Adiciona um evento de clique ao botão de confirmação para chamar a função de cadastro
document.getElementById('btnConfirm').addEventListener('click', cadastrar)

// Alterna a visibilidade da senha ao clicar no ícone de olho
btn.addEventListener('click', () => {
  let inputSenha = document.querySelector('#senha') // Seleciona o campo de senha
  
  // Verifica se o tipo do campo é 'password' e o alterna para 'text', e vice-versa
  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})