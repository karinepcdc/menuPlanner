
/*
<div class="alert alert-info alert-dismissible fade show">
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    <strong>Info!</strong> This alert box could indicate a neutral informative change or action.
  </div>
 */

/**
 * Constrõe e adiciona no DOM um alerta
 *
 * @param text Conteúdo textual do alerta
 * @param alertType tipo do alerta: "SUCESSO", "ALERTA", "DANGER"
 */
function showAlerts(text, alertType) {
    const alertParentElem = document.getElementById('alert');

    const alertElem = document.createElement('div');
    alertElem.classList.add('alert', 'alert-dismissible', 'fade', 'show');

    const buttomElem = document.createElement('button');
    buttomElem.type = "button";
    buttomElem.classList.add('btn-close');
    buttomElem.setAttribute('data-bs-dismiss', 'alert');

    const alertTypeElem = document.createElement('strong');

    const textNode = document.createTextNode(text);

    switch (alertType) {
        case 'SUCESSO':
            alertElem.classList.add('alert-success');
            alertTypeElem.appendChild(document.createTextNode('Sucesso: '));
            break;
        case 'ALERTA':
            alertElem.classList.add('alert-warning');
            alertTypeElem.appendChild(document.createTextNode('Alerta: '));
            break;
        case 'DANGER':
            alertElem.classList.add('alert-danger');
            alertTypeElem.appendChild(document.createTextNode('Erro: '));
            break;
        default:
            console.error("Tipo de alerta inexistente: " + alertType);
    }

    // estruturando elementos
    alertElem.appendChild(buttomElem)
    alertElem.appendChild(alertTypeElem)
    alertElem.appendChild(textNode);

    alertParentElem.appendChild(alertElem);

}