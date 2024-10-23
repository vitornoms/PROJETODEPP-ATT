if (localStorage.getItem("token") == null) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "../signin.html";
}

let button = document.getElementById("handleSubmit");

document.addEventListener('DOMContentLoaded', function() {
    button.onclick = async function() {
        let title = document.getElementById("title").value;
        let data = { title };

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

    function renderPostagens() {
        let postagensSalvas = JSON.parse(localStorage.getItem('postagensSalvas')) || [];
        let messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML = '';

        if (postagensSalvas.length > 0) {
            messagesDiv.style.display = 'block';
        } else {
            messagesDiv.style.display = 'none';
        }

        postagensSalvas.forEach(function(postagem, index) {
            let messageItem = document.createElement('div');
            messageItem.classList.add('message-item');

            let p = document.createElement('p');
            p.textContent = postagem.title;

            // Botão de editar
            let editButton = document.createElement('button');
            editButton.classList.add('edit-button');
            editButton.textContent = '✎';
            editButton.addEventListener('click', async function() {
                let novoTexto = prompt('Editar comentário:', postagem.title);
                if (novoTexto && novoTexto.trim() !== '') {
                    postagensSalvas[index].title = novoTexto; // Atualiza a postagem no array
                    localStorage.setItem('postagensSalvas', JSON.stringify(postagensSalvas)); // Salva no localStorage
                    await atualizarPostagem(postagem.id, novoTexto); // Atualiza no servidor
                    renderPostagens(); // Re-renderiza as postagens
                }
            });

            // Botão de deletar
            let deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = '🗑️';
            deleteButton.addEventListener('click', function() {
                postagensSalvas.splice(index, 1); // Remove a postagem do array
                localStorage.setItem('postagensSalvas', JSON.stringify(postagensSalvas)); // Atualiza o localStorage
                renderPostagens(); // Re-renderiza as postagens
            });

            // Adiciona os botões e o texto à mensagem
            messageItem.appendChild(p);
            messageItem.appendChild(editButton);
            messageItem.appendChild(deleteButton);
            messagesDiv.appendChild(messageItem);
        });
    }

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

    // Renderiza postagens salvas ao carregar a página
    renderPostagens();
});
