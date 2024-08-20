if (localStorage.getItem("token") == null) {
     alert("Você precisa estar logado para acessar essa página");
     window.location.href = "../signin.html";
   }

let button = document.getElementById("handleSubmit");

button.onclick = async function() {
    let title = document.getElementById("title").value;
    // let description = document.getElementById("description").value;
    let data = {title}

    const response = await fetch('http://localhost:3000/api/store/task', {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    });

    let content = await response.json();

    if(content.success) {
        alert("Sucesso")
    } else{
        alert('Não');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var postagensSalvas = JSON.parse(localStorage.getItem('postagensSalvas')) || [];
    var messagesDiv = document.getElementById('messages');

    // Função para renderizar postagens
    function renderPostagens() {
        messagesDiv.innerHTML = '';

        // Mostrar ou esconder o contêiner com base na presença de mensagens
        if (postagensSalvas.length > 0) {
            messagesDiv.style.display = 'block'; // Mostrar contêiner se houver mensagens
        } else {
            messagesDiv.style.display = 'none'; // Esconder contêiner se não houver mensagens
        }

        postagensSalvas.forEach(function(postagem, index) {
            var messageItem = document.createElement('div');
            messageItem.classList.add('message-item');

            var p = document.createElement('p');
            p.textContent = postagem;

            // Botão de editar
            var editButton = document.createElement('button');
            editButton.classList.add('edit-button');
            editButton.textContent = '✎';
            editButton.addEventListener('click', function() {
                var newText = prompt('Editar comentário:', postagem);
                if (newText !== null && newText.trim() !== '') {
                    postagensSalvas[index] = newText;
                    localStorage.setItem('postagensSalvas', JSON.stringify(postagensSalvas));
                    renderPostagens();
                }
            });

            // Botão de deletar
            var deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = '🗑️';
            deleteButton.addEventListener('click', function() {
                postagensSalvas.splice(index, 1);
                localStorage.setItem('postagensSalvas', JSON.stringify(postagensSalvas));
                renderPostagens();
            });

            // Adicionar os botões e o texto à mensagem
            messageItem.appendChild(p);
            messageItem.appendChild(editButton);
            messageItem.appendChild(deleteButton);
            messagesDiv.appendChild(messageItem);
        });
    }

    // Renderizar postagens salvas ao carregar a página
    renderPostagens();

    // Adicionar evento de clique ao botão de comentar
    document.getElementById('handleSubmit').addEventListener('click', function() {
        var texto = document.getElementById('title').value;
        if (texto) {
            postagensSalvas.push(texto);
            localStorage.setItem('postagensSalvas', JSON.stringify(postagensSalvas));
            renderPostagens();
            document.getElementById('title').value = ''; // Limpar o campo de entrada
        }
    });

    // Adicionar evento de clique ao botão de cancelar (limpar postagens)
    document.getElementById('handleClear').addEventListener('click', function() {
        localStorage.removeItem('postagensSalvas');
        postagensSalvas = [];
        renderPostagens();
    });
});

