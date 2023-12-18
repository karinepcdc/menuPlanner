let ingredientesReceita = [];
let comprasReceita = [];
let preparoReceita = [];

let loading = false;

window.onload = async function getReceita() {

    const id = window.location.pathname.slice(13);

    if (id.length !== 0) {
        loading = true;

        const response = await fetch("/api/receita/" + id);
        const receita = await response.json();

        setTitleInput(receita.titulo);

        ingredientesReceita = receita.ingredientes;
        preparoReceita = receita.preparo;
        comprasReceita = receita.compras;

        setIngredientes();

        setListagemPreparo();

        setListagemCompras();

        loading = false;
    }
}

function setTitleInput(titulo) {
    const tituloInput = document.getElementById('tituloReceita');
    tituloInput.value = titulo;
}

function setIngredientes() {
    const ingredientesElem = document.getElementById('listaIngredientes');

    let i = 0;
    for (const ingrediente of ingredientesReceita) {
        i++;
        const ingredienteElem = createItemList('ingrediente_' + i, ingrediente);
        ingredientesElem.appendChild(ingredienteElem);
    }
}

function setListagemPreparo() {
    const ingredientesElem = document.getElementById('listagemPreparo');

    let i = 0;
    for (const passo of preparoReceita) {
        i++;
        const ingredienteElem = createItemList('passo_' + i, passo);
        ingredientesElem.appendChild(ingredienteElem);
    }
}

function setListagemCompras() {
    const ingredientesElem = document.getElementById('listagemCompras');

    let i = 0;
    for (const item of comprasReceita) {
        i++;
        const ingredienteElem = createItemList('itemCompra_' + i, item);
        ingredientesElem.appendChild(ingredienteElem);
    }
}

/*
<li id="igrediente_1" class="p-2 rounded-2" onmouseover="emphasis('igrediente_1')" onmouseleave="unemphasis('igrediente_1')">
    <span class="purple-icon pe-2" hidden>
        <i class="fa-solid fa-ellipsis-vertical"></i>
    </span>

    <span>1 lata de tomate pelati</span>

    <span class="purple-icon ps-2" onclick="removeItem('igrediente_1')" >
        <i class="fa-solid fa-trash"></i>
    </span>
</li>
 */
function createItemList(elemId, text) {
    // li element
    const itemElem = document.createElement('li');
    itemElem.id = elemId;
    itemElem.classList.add('p-2', 'rounded-2');
    itemElem.addEventListener('mouseover', function () { emphasis(elemId) });
    itemElem.addEventListener('mouseleave', function () { unemphasis(elemId) });

    // dots icon
    const dotsElem = document.createElement('span');
    dotsElem.classList.add('purple-icon', 'pe-2');
    dotsElem.hidden = true;

    const dotsIconElem = document.createElement('i');
    dotsIconElem.classList.add('fa-solid', 'fa-ellipsis-vertical');

    dotsElem.appendChild(dotsIconElem);

    // text node
    const textElem = document.createElement('span');
    textElem.appendChild(document.createTextNode(text));

    // trash icon
    const trashElem = document.createElement('span');
    trashElem.classList.add('purple-icon', 'ps-2');
    trashElem.addEventListener('click', function () { removeItem(elemId) });

    const trashIconElem = document.createElement('i');
    trashIconElem.classList.add('fa-solid', 'fa-trash');

    trashElem.appendChild(trashIconElem);

    // estrutura
    itemElem.appendChild(dotsElem);
    itemElem.appendChild(textElem);
    itemElem.appendChild(trashElem);

    return itemElem;
}

function addItem(id) {
    const input = document.getElementById(id);
    if(input.value.trim()) {

        let newItemList;

        let listElem;
        switch (input.id) {
            case 'itemIngredientes':
                ingredientesReceita.push(input.value.trim());
                listElem = document.getElementById('listaIngredientes');

                newItemList = createItemList('ingrediente_' + ingredientesReceita.length, input.value.trim());

                console.log(ingredientesReceita);
                break;
            case 'passoModoDePreparo':
                preparoReceita.push(input.value.trim());
                listElem = document.getElementById('listagemPreparo');

                newItemList = createItemList('passo_' + preparoReceita.length, input.value.trim());

                console.log(preparoReceita);
                break;
            default:
                console.error("Lista do ingrediente não encontrada!");
        }
        listElem.appendChild(newItemList);
        input.value = '';
    }
}

function removeItem(id) {
    const item = document.getElementById(id);
    if(item.parentElement.id === "listaIngredientes") {

        const i = ingredientesReceita.findIndex(ingrediente => ingrediente === item.innerText);
        ingredientesReceita = ingredientesReceita.slice(0, i).concat(ingredientesReceita.slice(i + 1));
        console.log(ingredientesReceita);

    } else if(item.parentElement.id === "listagemPreparo"){

        const i = preparoReceita.findIndex(passo => passo === item.innerText);
        preparoReceita = preparoReceita.slice(0, i).concat(preparoReceita.slice(i + 1));
        console.log(preparoReceita);
    }

    item.parentElement.removeChild(item);
}

async function salvaReceita() {

    console.log("salvando receita")

    const id = window.location.pathname.slice(13);

    const receita = {};
    receita.titulo = document.getElementById('tituloReceita').value.trim();
    receita.ingredientes = ingredientesReceita;
    receita.img = null;
    receita.preparo = preparoReceita;
    receita.compras = comprasReceita;

    if (id.length !== 0) {
        receita.id = id;
    }

    const response = await fetch("/receitaForm",
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: {receita: JSON.stringify(receita)},
        });

    if(response.ok) {
        showAlerts("Receita salva!", 'SUCESSO');
    } else {
        showAlerts("Problema ao salvar receita", 'DANGER');
    }


    return false;
}


function emphasis(id) {
    const item = document.getElementById(id);

    item.classList.add('shadow', 'd-inline');
    item.children[0].hidden = false;
    // item.children[2].hidden = false;

}

function unemphasis(id) {
    const item = document.getElementById(id);

    item.classList.remove('shadow', 'd-inline');
    item.children[0].hidden = true;
    // item.children[2].hidden = true;
}