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
    emailjs.init('qO6vBxY3qj1kt6g7l');
    emailjs.sendForm('default_service', 'template_cz3c588', form);
    Swal.fire("Consulta enviada!");
    setTimeout(() => {
        window.location.replace("contacto.html");
      }, 2000);
}