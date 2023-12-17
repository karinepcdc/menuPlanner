/* Carregamento listagem */
let loading = false;

window.onload = async function getReceitas() {
    loading = true;

    const response = await fetch("/all/cardapios", { method: 'GET' });
    const cardapios = await response.json();

    const listagemElem = document.getElementById('listagemCardapios');

    for (const cardapio of cardapios) {
        listagemElem.appendChild(createItemList(cardapio));
    }

    loading = false;
};

function createItemList(cardapio) {
    const divElem = document.createElement('div');
    divElem.id = 'cardapio_' + cardapio.id;
    divElem.classList.add('d-inline-flex', 'p-3');

    // icone favorito
    const spanHeartElem = document.createElement('span');
    spanHeartElem.classList.add('purple-icon', 'pe-3');
    spanHeartElem.title = "favoritar";
    spanHeartElem.addEventListener('click',
        function() { toggleFavorito(cardapio.id) });

    const iconHeartElem = document.createElement('i');
    iconHeartElem.id = 'heart_cardapio_' + cardapio.id;
    if(cardapio.favorito) {
        iconHeartElem.classList.add('fa-solid', 'fa-heart');
    } else {
        iconHeartElem.classList.add('fa-regular', 'fa-heart');
    }

    spanHeartElem.appendChild(iconHeartElem);

    // carregar cardápio
    const spanArrowElem = document.createElement('span');
    spanArrowElem.classList.add('purple-icon');
    spanArrowElem.title = "Carrega cardápio";
    spanArrowElem.addEventListener('click', function() { toggleFavorito('heart_cardapio_1') });

    const iconArrowElem = document.createElement('i');
    iconArrowElem.classList.add('fa-solid', 'fa-retweet');
    spanArrowElem.addEventListener('click', function() { carregaMenu(cardapio.id) });

    spanArrowElem.appendChild(iconArrowElem);

    // deleta cardápio
    const spanTrashElem = document.createElement('span');
    spanTrashElem.classList.add('purple-icon', 'ps-3');
    spanTrashElem.title = "Remover cardápio";
    spanTrashElem.addEventListener('click', function() { deleteMenu(cardapio.id) });

    const iconTrashElem = document.createElement('i');
    iconTrashElem.classList.add('fa-solid', 'fa-trash');

    spanTrashElem.appendChild(iconTrashElem);

    // nome
    const pElemt = document.createElement('p');
    pElemt.classList.add('align-self-center', 'ps-3', 'm-0');
    pElemt.appendChild(document.createTextNode(cardapio.nome));

    divElem.appendChild(spanHeartElem);
    divElem.appendChild(spanArrowElem);
    divElem.appendChild(spanTrashElem);
    divElem.appendChild(pElemt);

    return divElem;
}

/* funcionalidades */
async function toggleFavorito(id) {

    const isFavorito = document.getElementById('heart_cardapio_' + id).classList.contains('fa-solid');

    try {
        // favoritar cardápio
        const resposta = await fetch('/cardapio/' + id + '?favorito=' + !isFavorito, {method: 'GET'});

        // atualizar lista
        if (resposta.ok) {
            if (isFavorito) {
                document.getElementById('heart_cardapio_' + id).classList.replace('fa-solid', 'fa-regular');
            } else {
                document.getElementById('heart_cardapio_' + id).classList.replace('fa-regular', 'fa-solid');
            }
        } else {
            showAlerts("Cardápio não encontrado no servidor!", 'DANGER');
        }
    } catch (e) {
        showAlerts(e, 'DANGER');
    }
}

async function deleteMenu(id) {
    try {
        // remover cardápio
        const resposta = await fetch("/cardapio/" + id, {method: "DELETE"});

        console.log(resposta)
        console.log(resposta.ok)

        // atualizar lista
        if (resposta.ok) {
            const listagemElem = document.getElementById('listagemCardapios');
            const deletedElem = document.getElementById('cardapio_' + id);

            console.log("atualizando lista")
            listagemElem.removeChild(deletedElem);

            showAlerts("Cardápio removido", 'SUCESSO');

        } else {
            showAlerts("Cardápio não encontrado no servidor!", 'DANGER');
        }
    } catch (e) {
        showAlerts(e, 'DANGER');
    }
}

function carregaMenu(id) {
    window.location.href = '/cardapio/' + id;
}
