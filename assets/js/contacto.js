const form = document.querySelector("#form");
console.log(form)
const validate = new window.JustValidate('#form');

validate
    .addField('#nombre', [
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Ingrese su nombre y apellido',
        },
        {
            rule: 'maxLength',
            value: 30,
        },
    ])
    .addField('#email', [
        {
            rule: 'required',
            errorMessage: 'Email es requerido',
        },
        {
            rule: 'email',
            errorMessage: 'Email invalido!',
        },
    ])
    .addField('#telefono', [
        {
            rule: 'number',
            errorMessage: 'Ingrese solo numeros para el telefono',
        },
        {
            rule: 'required',
            errorMessage: 'El telefono es requerido',
        },
    ]);
form.addEventListener("submit", (e) => handleSubmit(e));

function handleSubmit(e) {
    e.preventDefault();
    validate.isValid == true;
    console.log(validate.isValid);



}