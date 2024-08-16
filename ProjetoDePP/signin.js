let btn = document.querySelector('.fa-eye')

btn.addEventListener('click', ()=>{
  let inputSenha = document.querySelector('#senha')
  
  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})



async function entrar(){


  let email = document.querySelector('#email').value
  
  let senha = document.querySelector('#senha').value
  
  let data = {email, senha}
  console.log(data)


  const response = await fetch('http://localhost:3000/api/login',{
    method: "POST",
    headers: {"Content-type": "application/json;charset=UTF-8"},
    body: JSON.stringify(data)
  });

  console.log(response)

  let content = await response.json();

  if (content.success){
    alert('Sucesso')
    window.location.href = 'index.html';
  } else {
    alert('Não')
  }
}
