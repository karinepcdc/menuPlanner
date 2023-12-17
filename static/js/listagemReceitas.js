
let loading = false;

window.onload = async function getReceitas() {
    loading = true;

        const response = await fetch("/api/all/receitas");
        const receitas = await response.json();

    const listagemElem = document.getElementById('listagemReceitas');

    for (const receita of receitas) {
        listagemElem.appendChild(createItemList(receita));
    }

    loading = false;
};

function createItemList(receita) {
    const aElem = document.createElement('a');
    aElem.id = 'receita-' + receita.id;
    aElem.classList.add('nav-receita');
    aElem.href = '/receita/' + receita.id;

    const divElem = document.createElement('div');
    divElem.classList.add('d-inline-flex', 'pt-3');

    const imgElem = document.createElement('img');
    imgElem.src = receita.img?? "img/imgPlaceholder.png";
    imgElem.classList.add('img-thumbnail', 'img-thumbnail-receita', 'flex-shrink-1');

    const pElemt = document.createElement('p');
    pElemt.classList.add('align-self-center', 'ps-5', 'm-0');
    pElemt.appendChild(document.createTextNode(receita.titulo));

    divElem.appendChild(imgElem);
    divElem.appendChild(pElemt);

    aElem.appendChild(divElem);

    return aElem;
}