/* Carregamento listagem */
let loading = false;

window.onload = async function getReceitas() {
    loading = true;

    const response = await fetch("/all/cardapios");
    const cardapios = await response.json();
    console.log(cardapios);

    const listagemElem = document.getElementById('listagemCardapios');

    for (const cardapio of cardapios) {
        listagemElem.appendChild(createItemList(cardapio));
    }

    loading = false;
};


/*
<div class="d-flex flex-column align-items-center pt-3">
    <div id="cardapio_1" class="d-inline-flex pt-3">
        <span class="purple-icon pe-2" onclick="toggleFavorito('heart_cardapio_1')">
            <i class="fa-solid fa-heart"></i>
        </span>

        <span class="purple-icon" onclick="carrega(1)">
        <i class="fa-solid fa-arrow-up-from-bracket"></i>
        </span>

        <p class="align-self-center ps-3 m-0">CARDÁPIO BÁSICO</p>

        <span class="purple-icon ps-2" onclick="deleteMenu(1)">
        <i class="fa-solid fa-trash"></i>
        </span>
    </div>
</div>
 */
function createItemList(cardapio) {
    const div2Elem = document.createElement('div');
    div2Elem.id = 'cardapio-' + cardapio.id;
    div2Elem.classList.add('d-inline-flex', 'p-3');

    // icone favorito
    const spanHeartElem = document.createElement('span');
    spanHeartElem.classList.add('purple-icon', 'pe-3');
    spanHeartElem.title = "favoritar";
    spanHeartElem.addEventListener('click',
        function() { toggleFavorito('heart_cardapio_' + cardapio.id ) });

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

    div2Elem.appendChild(spanHeartElem);
    div2Elem.appendChild(spanArrowElem);
    div2Elem.appendChild(spanTrashElem);
    div2Elem.appendChild(pElemt);

    return div2Elem;
}

/* funcionalidades */
function toggleFavorito(heartId) {
    if(document.getElementById(heartId).classList.contains('fa-solid')) {
        document.getElementById(heartId).classList.replace('fa-solid', 'fa-regular');
    } else {
        document.getElementById(heartId).classList.replace('fa-regular', 'fa-solid');
    }
}

function deleteMenu(id) {
    //alert("Tem certeza que gostaria de remover o cardápio? \n A operação não pode ser desfeita.");
    const item = document.getElementById('cardapio_' + id);
    item.parentElement.removeChild(item);
}

function carregaMenu(id) {
    window.location.href = '/';
}
