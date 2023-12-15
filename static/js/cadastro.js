
let form = document.querySelector('.needs-validation');

form.addEventListener('submit', function (event) {
    if (!validate()) {
        event.preventDefault();
        event.stopPropagation();
    }

    form.classList.add('was-validated');
}, false);



function validate() {

    console.log("validando");
    let isValid = true;
    const email = document.getElementById("userEmail");

    if (!email.value.trim()) {
        isValid = false;
        email.parentElement.getElementsByClassName('invalid-feedback').innerHTML = "O email é necessário para recuperação de conta!";
    } else {
        const isValidEmail = new RegExp(
            /^([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ).test(email.value.trim());

        if(!isValidEmail) {
            isValid = false;
            email.parentElement.getElementsByClassName('invalid-feedback').innerHTML = "Entre um email válido";
        }
    }

    console.log(isValid);

    return isValid;
}