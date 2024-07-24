class Card {
    constructor(titulo, descricao, solicitante, areaResponsavel, prioridade,status = "Backlog") {
        this.titulo = titulo;
        this.descricao = descricao;
        this.solicitante = solicitante;
        this.areaResponsavel = areaResponsavel;
        this.prioridade = prioridade;
        this.status = status
    }

    validateData() {
        for (let i in this) {
            if (this[i] === undefined || this[i] === "") {
                return false;
            }
        }
        return true;
    }
}

class BaseDados {
    constructor() {
        let id = localStorage.getItem('id');
        if (id === null) {
            localStorage.setItem('id', 0);
        }
    }

    carregarCards() {
        const cards = [];
        const id = localStorage.getItem('id');
        for (let i = 1; i <= id; i++) {
            const card = JSON.parse(localStorage.getItem(i));
            if (card === null) {
                continue;
            }
            card.id = i;
            cards.push(card);
        }
        return cards;
    }

    criarCard(card) {
        let id = this.getID();
        localStorage.setItem(id, JSON.stringify(card));
        localStorage.setItem('id', id);  // Atualiza o ID no localStorage
    }

    removerCard(id) {
        localStorage.removeItem(id);
    }

    getID() {
        const nextId = localStorage.getItem('id');
        return parseInt(nextId) + 1;
    }

    atualizarCard(card) {
        localStorage.setItem(card.id, JSON.stringify(card));
    }
}

const baseDados = new BaseDados();

function cadastroCard() {
    let titulo = document.getElementById('TituloChamado').value;
    let descricao = document.getElementById('DescricaoChamado').value;
    let solicitante = document.getElementById('SolicitanteChamado').value;
    let areaResponsavel = document.getElementById('AreaResponsavelChamado').value;
    let prioridade = document.getElementById('PrioridadeChamado').value;

    const card = new Card(titulo, descricao, solicitante, areaResponsavel, prioridade);

    if (card.validateData()) {
        baseDados.criarCard(card);
        window.location.reload();
    }
}

function carregarCards(cards) {
    if (cards === undefined) {
        cards = baseDados.carregarCards();
    }

    const listaChamados = document.getElementById('listaChamados');
    listaChamados.innerHTML = '';

    cards.forEach((c) => {
        const row = listaChamados.insertRow();

        row.insertCell(0).innerHTML = c.titulo;
        row.insertCell(1).innerHTML = c.descricao;
        row.insertCell(2).innerHTML = c.solicitante;
        row.insertCell(3).innerHTML = c.areaResponsavel;
        row.insertCell(4).innerHTML = c.prioridade;
        
        const statusCell = row.insertCell(5);
        const statusSelect = document.createElement('select');
        statusSelect.className = 'form-select';
        statusSelect.innerHTML = `
            <option value="Backlog" ${c.status === 'Backlog' ? 'selected' : ''}>Backlog</option>
            <option value="Andamento" ${c.status === 'Andamento' ? 'selected' : ''}>Andamento</option>
            <option value="Concluido" ${c.status === 'Concluido' ? 'selected' : ''}>Concluido</option>
            <option value="Cancelado" ${c.status === 'Cancelado' ? 'selected' : ''}>Cancelado</option>
        `;
        statusSelect.onchange = () => {
            c.status = statusSelect.value;
            baseDados.atualizarCard(c);
        };
        statusCell.append(statusSelect);

        const btn = document.createElement('button')

        btn.className = 'btn btn-danger'
        btn.id = c.id
        btn.innerHTML = 'Delete'
        btn.onclick = () => {
            const id = c.id
            baseDados.removerCard(id)
            window.location.reload()
        }

        row.insertCell(6).append(btn)
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.body.contains(document.getElementById('listaChamados'))) {
        carregarCards();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    mudarConteudo('SobrePrintOpenCard.html');
});

function mudarConteudo(url) {
    const reqst = new XMLHttpRequest();
    reqst.open('GET', url, true);
    reqst.onreadystatechange = function() {
        if (reqst.readyState === 4) {
            if (reqst.status === 200) {
                document.getElementById('conteudo').innerHTML = reqst.responseText;
            } else if (reqst.status === 404) {
                console.error('Erro 404: Página não encontrada.');
            } else {
                console.error('Erro ao carregar a página. Status: ' + reqst.status);
            }
        }
    };
    reqst.send();
}
