
function toggleFavorito(heartId) {
    if(document.getElementById(heartId).classList.contains('fa-solid')) {
        document.getElementById(heartId).classList.replace('fa-solid', 'fa-regular');
    } else {
        document.getElementById(heartId).classList.replace('fa-regular', 'fa-solid');
    }
}

function deleteMenu(id) {
    //alert("Tem certeza que gostaria de remover o cardápio? \n A operação não pode ser desfeita.");
    const item = document.getElementById(id);
    item.parentElement.removeChild(item);
}