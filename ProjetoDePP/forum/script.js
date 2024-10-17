if (localStorage.getItem("token") == null) { // Verifica se o token de autenticação está ausente no localStorage.
    alert("Você precisa estar logado para acessar essa página"); // Exibe um alerta informando ao usuário que ele precisa estar logado.
    window.location.href = "../signin.html"; // Redireciona o usuário para a página de login (signin.html).
}

let button = document.getElementById("handleSubmit"); // Obtém o elemento com o ID "handleSubmit" e o armazena na variável 'button'.

button.onclick = async function() { // Adiciona um evento de clique ao botão, definido como uma função assíncrona.
    let title = document.getElementById("title").value; // Obtém o valor do elemento com o ID "title" e o armazena na variável 'title'.
    // let description = document.getElementById("description").value; // (Comentado) Obtém o valor do elemento com o ID "description".
    let data = {title}; // Cria um objeto contendo o título como uma propriedade.

    const response = await fetch('http://localhost:3000/api/store/task', { // Faz uma requisição POST ao servidor.
        method: "POST", // Define o método HTTP como POST.
        headers: {"Content-type": "application/json;charset=UTF-8"}, // Define os cabeçalhos da requisição, especificando que o corpo é JSON.
        body: JSON.stringify(data) // Converte o objeto 'data' para JSON e o envia como corpo da requisição.
    });

    let content = await response.json(); // Espera a resposta do servidor e a converte para um objeto JavaScript.

    if (content.success) {
        // Salva a nova postagem com o ID retornado
        const novaPostagem = content.data;
        let postagensSalvas = JSON.parse(localStorage.getItem('postagensSalvas')) || [];
        postagensSalvas.push(novaPostagem);
        localStorage.setItem('postagensSalvas', JSON.stringify(postagensSalvas));
        
        alert("Sucesso");
        renderPostagens(); // Atualiza a interface
        document.getElementById('title').value = ''; // Limpa o campo de entrada
    } else {
        alert('Não');
    }
};

document.addEventListener('DOMContentLoaded', function() { // Adiciona um evento que executa a função quando o DOM é carregado.
    var postagensSalvas = JSON.parse(localStorage.getItem('postagensSalvas')) || []; // Recupera as postagens salvas do localStorage, ou um array vazio se não houver.
    var messagesDiv = document.getElementById('messages'); // Obtém o elemento com o ID 'messages' para exibir as postagens.
    
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
    
    // Função para renderizar postagens
    function renderPostagens() {
        messagesDiv.innerHTML = ''; // Limpa o conteúdo anterior do elemento 'messagesDiv'.

        // Mostrar ou esconder o contêiner com base na presença de mensagens
        if (postagensSalvas.length > 0) { // Se houver postagens salvas...
            messagesDiv.style.display = 'block'; // ...exibe o contêiner de mensagens.
        } else {
            messagesDiv.style.display = 'none'; // ...caso contrário, oculta o contêiner de mensagens.
        }

        postagensSalvas.forEach(function(postagem, index) { // Itera sobre cada postagem salva.
            var messageItem = document.createElement('div'); // Cria um novo elemento <div> para cada postagem.
            messageItem.classList.add('message-item'); // Adiciona uma classe ao elemento <div>.

            var p = document.createElement('p'); // Cria um novo elemento <p> para o texto da postagem.
            p.textContent = postagem; // Define o texto da postagem.

            // Botão de editar
            var editButton = document.createElement('button');
            editButton.classList.add('edit-button');
            editButton.textContent = '✎';
            editButton.addEventListener('click', async function() {
                console.log(postagem.id);
                let novoTexto = prompt('Editar comentário:', postagem.title);
                if (novoTexto && novoTexto.trim() !== '') {
                    postagensSalvas[index].title = novoTexto;
                    localStorage.setItem('postagensSalvas', JSON.stringify(postagensSalvas));
                    await atualizarPostagem(postagem.id, novoTexto);
                    renderPostagens();
                }
            });

            // Botão de deletar
            var deleteButton = document.createElement('button'); // Cria um botão para deletar a postagem.
            deleteButton.classList.add('delete-button'); // Adiciona uma classe ao botão de deletar.
            deleteButton.textContent = '🗑️'; // Define o texto do botão como um ícone de lixeira.
            deleteButton.addEventListener('click', function() { // Adiciona um evento de clique ao botão de deletar.
                postagensSalvas.splice(index, 1); // Remove a postagem do array.
                localStorage.setItem('postagensSalvas', JSON.stringify(postagensSalvas)); // Atualiza o localStorage com a postagem removida.
                renderPostagens(); // Re-renderiza as postagens para refletir a remoção.
            });

            // Adicionar os botões e o texto à mensagem
            messageItem.appendChild(p); // Adiciona o texto da postagem ao elemento <div>.
            messageItem.appendChild(editButton); // Adiciona o botão de editar ao elemento <div>.
            messageItem.appendChild(deleteButton); // Adiciona o botão de deletar ao elemento <div>.
            messagesDiv.appendChild(messageItem); // Adiciona o elemento <div> ao contêiner de mensagens.
        });
    }

    // Renderizar postagens salvas ao carregar a página
    renderPostagens(); // Chama a função para renderizar as postagens salvas quando a página é carregada.

    // Adicionar evento de clique ao botão de comentar
    document.getElementById('handleSubmit').addEventListener('click', function() { // Adiciona um evento de clique ao botão de "Comentar".
        var texto = document.getElementById('title').value; // Obtém o valor do campo de entrada com o ID 'title'.
        if (texto) { // Se o texto não estiver vazio...
            postagensSalvas.push(texto); // Adiciona o texto ao array de postagens salvas.
            localStorage.setItem('postagensSalvas', JSON.stringify(postagensSalvas)); // Atualiza o localStorage com a nova postagem.
            renderPostagens(); // Re-renderiza as postagens para incluir a nova postagem.
            document.getElementById('title').value = ''; // Limpa o campo de entrada após a postagem.
        }
    });
});

