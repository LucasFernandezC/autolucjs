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
    .addField('#mail', [
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
    ])
    .addField('#km', [
        {
            rule: 'number',
            errorMessage: 'Ingrese solo numeros para los kilometros',
        },
        {
            rule: 'required',
            errorMessage: 'Los KM son requeridos',
        },
    ]);
form.addEventListener("submit", (e) => handleSubmit(e));

function handleSubmit(e) {
    e.preventDefault();
    validate.isValid == true;
    console.log(validate.isValid);
    if(validate.isValid){
    emailjs.init('qO6vBxY3qj1kt6g7l');
    emailjs.sendForm('default_service', 'template_cz3c588', form);
    //llegue al limite de templates permitidos por mailjs por eso utilizo el de contacto. sino se informarian
    //todos los datos del auto que se esta solicitando vender
    Swal.fire('Venda su Auto', 'Solicitud de venta enviada', 'success');
    setTimeout(() => {
        window.location.replace("vende.html");
      }, 2000);
    }
    else {
        Swal.fire('Faltan datos', 'Verifique los datos ingresados', 'error');
    }
}