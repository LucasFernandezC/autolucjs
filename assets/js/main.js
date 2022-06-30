//codigo central
const arrayAutos = [];
const arraySelects = [];


fetch("./assets/js/autos.json")
    .then((respuesta) => respuesta.json())
    .then((data) => {
        for (const elemento of data.autos) {
            arrayAutos.push(new Auto(elemento.marca, elemento.anio, elemento.tipo, elemento.puertas, elemento.combustible, elemento.aire, elemento.esp, elemento.techo, elemento.img, elemento.id));
        }
        cargarPantalla(arrayAutos);
        fetch("./assets/js/select.json")
            .then((respuesta) => respuesta.json())
            .then((data) => {
                for (const elemento of data.selects) {
                    arraySelects.push(new Selects(elemento.tipo, elemento.valor));
                }
                cargarSelects(arrayAutos);;
            })
    })



let carrito = [];
let carritoGrabado = JSON.parse(localStorage.getItem("listacarr"));
carritoGrabado != null && acomodarCarrito(carritoGrabado);
//cargarSelects(arrayAutos);
//cargarPantalla(arrayAutos);
botonSearch = document.getElementById("botonbusqueda");
botonSearch.onclick = () => filtrarBusqueda();
botonReset = document.getElementById("botonreset");
botonReset.onclick = () => { cargarPantalla(arrayAutos); cargarSelects(arrayAutos) };




//funciones
//esta funcion se encarga de volver a generar el carrito a partir de lo que recupero del storage
function acomodarCarrito(recuperado) {
    for (const literal of recuperado) {
        let temp = new Auto(literal.marca, literal.anio, literal.tipo, literal.puertas, literal.combustible, literal.aire, literal.esp, literal.techo, literal.img, literal.id);
        carrito.push(temp);
    }
    mostrarCarrito(1);
}


//funcion que agrega productos al array del carrito
function agregarCarrito(e) {

    if (carrito.some((el) => el.id == e.id)) {
        Swal.fire(
            'El vehiculo ya se encuentra en favoritos',
            'se dejo en favoritos',
            'info'
        )
    }
    else {
        carrito.push(e);
        Toastify({
            text: "Auto agregado!",
            duration: 3000
        }).showToast();
        mostrarCarrito(0);
    }

}

function sacarCarrito(e) {

    carrito = carrito.filter((el) => e.id != el.id);
    Toastify({
        text: "Auto olvidado!",
        duration: 3000
    }).showToast();
    mostrarCarrito();


}

//funcion que edita el html para agregar los productos al carrito
function mostrarCarrito(ejecucion) {
    let carritoDom = document.getElementById("carrito");
    carritoDom.innerHTML = "";
    for (const item of carrito) {

        li = document.createElement("li");
        button = document.createElement("button");
        button.class = "dropdown-item";
        button.innerText = item.marca + item.anio;
        let carritoButton = document.createElement("a");
        carritoButton.className = "btn btn-primary center";
        carritoButton.id = "btnrmv" + item.id;
        carritoButton.text = "No me gusta!";
        li.appendChild(button);
        li.appendChild(carritoButton);
        carritoDom.appendChild(li);

    }
    ejecucion != 1 ? localStorage.setItem("listacarr", JSON.stringify(carrito)) : "";
    carrito.forEach(auto => { document.getElementById("btnrmv" + auto.id).addEventListener("click", function () { sacarCarrito(auto) }) });


}

//Funcion que genera el html con los vehiculos. se utiliza tanto para la carga inicial como para cuando se aplican filtros
function cargarPantalla(array) {
    let resultadosFiltro = document.getElementById("resultadosBusqueda");
    resultadosFiltro.innerHTML = "";
    let contenedor;
    for (const autos of array) {
        contenedor = document.createElement("div");
        let card = document.createElement("article");
        card.className = "card busquedaresults__card";
        let cardImg = document.createElement("img");
        cardImg.src = "assets/images/" + autos.img + ".jpg";
        cardImg.className = "card-img-top";
        cardImg.alt = "Auto en venta";
        let cardBody = document.createElement("div");
        cardBody.className = "card-body text-center";
        let cardH5 = document.createElement("h5");
        cardH5.className = "card-title titulotarjeta"
        cardH5.innerText = autos.marca + " " + autos.anio;
        let cardP = document.createElement("p");
        cardP.className = "card-text";
        let detalle = autos.puertas + ", " + autos.combustible + ", " + autos.tipo;
        autos.aire == true && (detalle += ", aire acondicionado");
        autos.esp && (detalle += ", Control de estabilidad");
        autos.techo && (detalle += ", Techo corredizo");
        cardP.innerText = detalle;
        let cardButton = document.createElement("a");
        cardButton.className = "btn btn-primary center";
        cardButton.id = autos.id;
        cardButton.text = "Me gusta!";
        cardBody.appendChild(cardH5);
        cardBody.appendChild(cardP);
        cardBody.appendChild(cardButton);
        card.appendChild(cardImg);
        card.appendChild(cardBody);
        contenedor.appendChild(card);
        resultadosFiltro.appendChild(contenedor);
    }
    array.forEach(auto => {
        document.getElementById(auto.id).addEventListener("click", function () { agregarCarrito(auto) })
    });

}

//funcion nueva que limpia los select 
function limpiarSelects() {
    const select = document.getElementsByClassName("form-select");
    for (i = 0; i < select.length; i++) {
        select[i].innerHTML = "";

    }
}


//funcion para la carga de los select de acuerdo a las categorias y al inventario disponible
function cargarSelects(arrayPantalla) {
    limpiarSelects();
    for (const select of arraySelects) {

        if (select.tipo == "marca") {
            if ((arrayPantalla.some((el) => el.marca == select.valor)) || select.valor == "Todos") {
                let option = document.createElement("option");
                option.innerText = select.valor;
                let contenedorSelect = document.getElementById(select.tipo);
                contenedorSelect.appendChild(option);
            }
        }
        else if (select.tipo == "tipo") {
            if ((arrayPantalla.some((el) => el.tipo == select.valor)) || select.valor == "Todos") {
                let option = document.createElement("option");
                option.innerText = select.valor;
                let contenedorSelect = document.getElementById(select.tipo);
                contenedorSelect.appendChild(option);
            }
        }
        else if (select.tipo == "ptas") {
            if ((arrayPantalla.some((el) => el.puertas == select.valor)) || select.valor == "Todos") {
                let option = document.createElement("option");
                option.innerText = select.valor;
                let contenedorSelect = document.getElementById(select.tipo);
                contenedorSelect.appendChild(option);
            }
        }
        else if (select.tipo == "comb") {
            if ((arrayPantalla.some((el) => el.combustible == select.valor)) || select.valor == "Todos") {
                let option = document.createElement("option");
                option.innerText = select.valor;
                let contenedorSelect = document.getElementById(select.tipo);
                contenedorSelect.appendChild(option);
            }
        }
    }
}


//funcion que maneja los filtros en la pagina

function filtrarBusqueda() {
    let resultado = arrayAutos;
    let marca = document.getElementById("marca");
    let tipo = document.getElementById("tipo");
    let comb = document.getElementById("comb");
    let ptas = document.getElementById("ptas");
    let aire = document.getElementById("aire");
    let techo = document.getElementById("techo");
    let esp = document.getElementById("esp");

    marca.options[marca.selectedIndex].value != "Todos" && (resultado = resultado.filter((el) => el.marca.toLowerCase() == marca.options[marca.selectedIndex].value.toLowerCase()));
    tipo.options[tipo.selectedIndex].value != "Todos" && (resultado = resultado.filter((el) => el.tipo.toLowerCase() == tipo.options[tipo.selectedIndex].value.toLowerCase()));
    comb.options[comb.selectedIndex].value != "Todos" && (resultado = resultado.filter((el) => el.combustible.toLowerCase() == comb.options[comb.selectedIndex].value.toLowerCase()));
    ptas.options[ptas.selectedIndex].value != "Todos" && (resultado = resultado.filter((el) => el.puertas.toLowerCase() == ptas.options[ptas.selectedIndex].value.toLowerCase()));
    aire.checked && (resultado = resultado.filter((el) => el.aire == true));
    techo.checked && (resultado = resultado.filter((el) => el.techo == true));
    esp.checked && (resultado = resultado.filter((el) => el.esp == true));

    if (resultado.length == 0) {
        Swal.fire(
            'La busqueda no arrojo resultados',
            'se cargaran los autos nuevamente',
            'info'
        );
        cargarPantalla(arrayAutos);
        cargarSelects(arrayAutos);


    }
    else {
        cargarPantalla(resultado);
        cargarSelects(resultado);
    }
}