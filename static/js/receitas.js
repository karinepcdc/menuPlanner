console.log()

let loading = false;

window.onload = async function getReceita() {
    loading = true;
    const id = window.location.pathname.slice(9);

    const response = await fetch("/api/receita/" + id);
    const receita = await response.json();

    const btnEditarElem = document.getElementById('btnEditar');
    btnEditarElem.href = '/receitaForm/' + id;

    setTitle(receita.titulo);

    setListagemIngredientes(receita.ingredientes);

    setListagemPreparo(receita.preparo);

    setListagemCompras(receita.compras);

    loading = false;
};

function setTitle(titulo) {
    const tituloElem = document.getElementById('titulo');
    tituloElem.innerText = titulo;
}

function setListagemIngredientes(ingredientes) {
    const ingredientesElem = document.getElementById('listagemIngredientes');

    if(ingredientes.length !== 0) {
        for (const ingrediente of ingredientes) {
            const ingredienteElem = document.createElement('li');
            ingredienteElem.appendChild(document.createTextNode(ingrediente));
            ingredientesElem.appendChild(ingredienteElem);
        }
    } else {
        const nenhumElem = document.createElement('p');
        nenhumElem.classList.add('fst-italic', 'text-muted');
        nenhumElem.appendChild(document.createTextNode("Nenhum item cadastrado."))
        ingredientesElem.parentElement.appendChild(nenhumElem);
    }

}

function setListagemPreparo(modoDePreparo) {
    const ingredientesElem = document.getElementById('listagemPreparo');

    if(modoDePreparo.length !== 0) {
        for (const passo of modoDePreparo) {
            const ingredienteElem = document.createElement('li');
            ingredienteElem.appendChild(document.createTextNode(passo));
            ingredientesElem.appendChild(ingredienteElem);
        }
    } else {
        const nenhumElem = document.createElement('p');
        nenhumElem.classList.add('fst-italic', 'text-muted');
        nenhumElem.appendChild(document.createTextNode("Nenhum passo cadastrado."))
        ingredientesElem.parentElement.appendChild(nenhumElem);
    }

}

function setListagemCompras(compras) {
    const ingredientesElem = document.getElementById('listagemCompras');

    if(compras.length !== 0) {
        for (const item of compras) {
            const ingredienteElem = document.createElement('li');
            ingredienteElem.appendChild(document.createTextNode(item));
            ingredientesElem.appendChild(ingredienteElem);
        }
    } else {
        const nenhumElem = document.createElement('p');
        nenhumElem.classList.add('text-center', 'fst-italic', 'text-muted');
        nenhumElem.appendChild(document.createTextNode("Nenhum item cadastrado."))
        ingredientesElem.parentElement.appendChild(nenhumElem);
    }

}