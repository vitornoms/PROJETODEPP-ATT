if (localStorage.getItem("token") == null) { // Verifica se o token de autenticação está ausente no localStorage. 
  alert("Você precisa estar logado para acessar essa página"); // Exibe um alerta informando ao usuário que ele precisa estar logado.
  window.location.href = "signin.html"; // Redireciona o usuário para a página de login (signin.html).
}

// const userLogado = JSON.parse(localStorage.getItem("userLogado")); 
// Este código foi comentado e não será executado. Ele serve para recuperar e analisar os dados do usuário logado armazenados no localStorage.

// const logado = document.querySelector("#logado");
// logado.innerHTML = `Olá ${userLogado.nome}`;
// Este código também está comentado. Ele procuraria um elemento com o ID "logado" na página e inseriria uma saudação com o nome do usuário logado.

let iduser = localStorage.getItem('testeid')

function sair() { // Define a função 'sair' que é responsável por realizar o logout do usuário.
  localStorage.removeItem("token"); // Remove o token de autenticação do localStorage, efetivamente deslogando o usuário.
  localStorage.removeItem("userLogado"); // Remove as informações do usuário logado do localStorage.
  window.location.href = "signin.html"; // Redireciona o usuário para a página de login após o logout.
}
