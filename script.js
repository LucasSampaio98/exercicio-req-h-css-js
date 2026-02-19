// Função principal para buscar usuário
async function buscarUsuario() {
    const username = document.getElementById('username').value.trim();

    if (!username) {
        mostrarErro('Por favor, digite um nome de usuário');
        return;
    }

    mostrarCarregando();

    try {
        // Fazendo a requisição para a API do GitHub
        const response = await fetch(`https://api.github.com/users/${username}`);

        // Verificando se a requisição foi bem-sucedida
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Usuário não encontrado!');
            } else {
                throw new Error('Erro na requisição. Tente novamente mais tarde.');
            }
        }

        // Convertendo a resposta para JSON
        const data = await response.json();

        // Mostrando os dados na tela
        mostrarResultado(data);

    } catch (error) {
        mostrarErro(error.message);
    }
}

// Função para mostrar o resultado
function mostrarResultado(usuario) {
    const resultadoDiv = document.getElementById('resultado');

    resultadoDiv.innerHTML = `
        <div class="usuario-info">
            <img src="${usuario.avatar_url}" alt="${usuario.name}">
            <div>
                <h2>${usuario.name || usuario.login}</h2>
                <p><strong>Usuário:</strong> ${usuario.login}</p>
                <p><strong>Bio:</strong> ${usuario.bio || 'Não informada'}</p>
                <p><strong>Repositórios:</strong> ${usuario.public_repos}</p>
                <p><strong>Seguidores:</strong> ${usuario.followers}</p>
                <p><strong>Seguindo:</strong> ${usuario.following}</p>
            </div>
        </div>
    `;
}

// Função para mostrar mensagem de carregamento
function mostrarCarregando() {
    document.getElementById('resultado').innerHTML = `
        <div class="carregando">
            <p>Buscando usuário...</p>
        </div>
    `;
}

// Função para mostrar mensagem de erro
function mostrarErro(mensagem) {
    document.getElementById('resultado').innerHTML = `
        <div class="erro">
            <p>❌ ${mensagem}</p>
        </div>
    `;
}

// Função para testar com usuários pré-definidos
function testarUsuario(username) {
    document.getElementById('username').value = username;
    buscarUsuario();
}

// Adicionando evento para buscar ao pressionar Enter
document.getElementById('username').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        buscarUsuario();
    }
});

// Buscar usuário inicial automaticamente quando a página carregar
window.addEventListener('load', function () {
    buscarUsuario();
});

// Versão alternativa usando XMLHttpRequest (mais antiga)
function buscarUsuarioXMLHttp() {
    const username = document.getElementById('username').value.trim();

    if (!username) {
        mostrarErro('Por favor, digite um nome de usuário');
        return;
    }

    mostrarCarregando();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/users/${username}`, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            mostrarResultado(data);
        } else if (xhr.status === 404) {
            mostrarErro('Usuário não encontrado!');
        } else {
            mostrarErro('Erro na requisição. Tente novamente mais tarde.');
        }
    };

    xhr.onerror = function () {
        mostrarErro('Erro de conexão. Verifique sua internet.');
    };

    xhr.send();
}