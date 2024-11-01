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
    
        const container = document.getElementById('postagens-container'); // Substitua pelo ID do seu container
    
        // Limpa o container antes de adicionar as postagens
        container.innerHTML = '';
    
        // Armazena as postagens salvas no localStorage
        let postagensSalvas = JSON.parse(localStorage.getItem('postagensSalvas')) || [];
    
        result.data.forEach((postagem, index) => {
            let messageItem = document.createElement('div');
            messageItem.classList.add('message-item');
    
            let p = document.createElement('p');
            p.textContent = postagem.title;
    
            // Cria o botão de edição
            let editButton = document.createElement('button');
            editButton.classList.add('edit-button');
            editButton.textContent = '✎';
            editButton.addEventListener('click', async function() {
                let novoTexto = prompt('Editar comentário:', postagem.title);
                if (novoTexto && novoTexto.trim() !== '') {
                    // Atualiza a postagem no array
                    postagensSalvas[index] = { ...postagem, title: novoTexto };
                    localStorage.setItem('postagensSalvas', JSON.stringify(postagensSalvas)); // Salva no localStorage
                    await atualizarPostagem(postagem.id, novoTexto); // Atualiza no servidor
                    renderPostagens(); // Re-renderiza as postagens
                }
            });
    
            // Cria o botão de deletar
            let deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = '🗑️';
            deleteButton.addEventListener('click', async function() {
                postagensSalvas.splice(index, 1); // Remove a postagem do array
                localStorage.setItem('postagensSalvas', JSON.stringify(postagensSalvas)); // Atualiza o localStorage
                await deletarPostagem(postagem.id); // Deleta a postagem do servidor
                renderPostagens(); // Re-renderiza as postagens
            });
    
            // Adiciona os elementos ao messageItem
            messageItem.appendChild(p);
            messageItem.appendChild(editButton);
            messageItem.appendChild(deleteButton);
            container.appendChild(messageItem);
        });
    }
    
    // Função para atualizar a postagem no servidor
    async function atualizarPostagem(id, novoTexto) {
        await fetch(`http://localhost:3000/api/update/task/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: novoTexto }),
        });
    }
    
    // Função para deletar a postagem do servidor
    async function deletarPostagem(id) {
        await fetch(`http://localhost:3000/api/delete/task/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
    }
    
    // Função para re-renderizar as postagens
    function renderPostagens() {
        getPostagens();
    }

    getPostagens();
    
});

