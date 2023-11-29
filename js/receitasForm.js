
function emphasis(id) {
    const item = document.getElementById(id);

        item.classList.add('shadow', 'd-inline');
        item.children[0].hidden = false;
        // item.children[2].hidden = true;

}

function unemphasis(id) {
    const item = document.getElementById(id);

    item.classList.remove('shadow', 'd-inline');
    item.children[0].hidden = true;
    // item.children[2].hidden = false;
}

function removeItem(id) {
    const item = document.getElementById(id);
    item.parentElement.removeChild(item);
}