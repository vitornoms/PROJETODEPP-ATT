if (localStorage.getItem("token") == null) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "../signin.html";
  }
  
  let user = JSON.parse(localStorage.getItem('userdata'));
  console.log(user.id); // Agora você pode acessar user.id
  
  
  let button = document.getElementById("handleSubmit");
  
  document.addEventListener('DOMContentLoaded', function() {
    button.onclick = async function() {
      let title = document.getElementById("title").value;
      let userId = user.id
      let data = { title, userId }; // Inclui o user.id como userId
      console.log(data);
  
      const response = await fetch('http://localhost:3000/api/store/task', {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
      });
  
      let content = await response.json();
  
      if (content.success) {
        const novaPostagem = content.data;
        let postagensSalvas = JSON.parse(localStorage.getItem('postagensSalvas')) || [];
        postagensSalvas.push(novaPostagem);
        localStorage.setItem('postagensSalvas', JSON.stringify(postagensSalvas));
        alert("Sucesso");
        renderPostagens();
        document.getElementById('title').value = '';
      } else {
        alert('Não foi possível postar.');
      }
    };
  
    async function atualizarPostagem(id, novoTexto) {
      const response = await fetch(`http://localhost:3000/api/update/task/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: novoTexto })
      });
  
      const result = await response.json();
      if (result.success) {
        alert('Postagem atualizada com sucesso!');
      } else {
        alert('Erro ao atualizar postagem.');
      }
    }
  
    async function deletarPostagem(id) {
      const response = await fetch(`http://localhost:3000/api/delete/task/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const result = await response.json();
      if (result.success) {
        alert('Postagem deletada com sucesso!');
      } else {
        alert('Erro ao deletar postagem.');
      }
    }
  
    async function getPostagens() {
      const response = await fetch(`http://localhost:3000/api/task`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const result = await response.json();
      console.log(result);
  
      const container = document.getElementById('postagens-container');
      container.innerHTML = '';
  
      let postagensSalvas = JSON.parse(localStorage.getItem('postagensSalvas')) || [];
  
      result.data.forEach((postagem, index) => {
        if (postagem.id_user === user.id) { // Filtra postagens do usuário logado
          let messageItem = document.createElement('div');
          messageItem.classList.add('message-item');
  
          let p = document.createElement('p');
          p.textContent = postagem.title;
  
          let editButton = document.createElement('button');
          editButton.classList.add('edit-button');
          editButton.textContent = '✎';
          editButton.addEventListener('click', async function() {
            let novoTexto = prompt('Editar comentário:', postagem.title);
            if (novoTexto && novoTexto.trim() !== '') {
              postagensSalvas[index] = { ...postagem, title: novoTexto };
              localStorage.setItem('postagensSalvas', JSON.stringify(postagensSalvas));
              await atualizarPostagem(postagem.id, novoTexto);
              renderPostagens();
            }
          });
  
          let deleteButton = document.createElement('button');
          deleteButton.classList.add('delete-button');
          deleteButton.textContent = '🗑️';
          deleteButton.addEventListener('click', async function() {
            postagensSalvas.splice(index, 1);
            localStorage.setItem('postagensSalvas', JSON.stringify(postagensSalvas));
            await deletarPostagem(postagem.id);
            renderPostagens();
          });
  
          messageItem.appendChild(p);
          messageItem.appendChild(editButton);
          messageItem.appendChild(deleteButton);
          container.appendChild(messageItem);
        } else {
            let messageItem = document.createElement('div');
          messageItem.classList.add('message-item');
  
          let p = document.createElement('p');
          p.textContent = postagem.title;
          messageItem.appendChild(p);
          container.appendChild(messageItem);
        }
      });
    }
  
    function renderPostagens() {
      getPostagens();
    }
  
    getPostagens();
  });
  