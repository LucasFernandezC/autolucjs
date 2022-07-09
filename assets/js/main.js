//codigo central
const arrayAutos = [];
const arraySelects = [];

fetch("./assets/js/autos.json")
  .then((respuesta) => respuesta.json())
  .then((data) => {
    for (const elemento of data.autos) {
      arrayAutos.push(
        new Auto(
          elemento.marca,
          elemento.anio,
          elemento.tipo,
          elemento.puertas,
          elemento.combustible,
          elemento.aire,
          elemento.esp,
          elemento.techo,
          elemento.img,
          elemento.id,
          elemento.precio
        )
      );
    }
    cargarPantalla(arrayAutos);
    fetch("./assets/js/select.json")
      .then((respuesta) => respuesta.json())
      .then((data) => {
        for (const elemento of data.selects) {
          arraySelects.push(new Selects(elemento.tipo, elemento.valor));
        }
        cargarSelects(arrayAutos);
      });
  });

let carrito = [];
let carritoGrabado = JSON.parse(localStorage.getItem("listacarr"));
carritoGrabado != null && acomodarCarrito(carritoGrabado);
//cargarSelects(arrayAutos);
//cargarPantalla(arrayAutos);
botonSearch = document.getElementById("botonbusqueda");
botonSearch.onclick = () => filtrarBusqueda();
botonReset = document.getElementById("botonreset");
botonReset.onclick = () => {
  cargarPantalla(arrayAutos);
  cargarSelects(arrayAutos);
};

//funciones
//esta funcion se encarga de volver a generar el carrito a partir de lo que recupero del storage
function acomodarCarrito(recuperado) {
  for (const literal of recuperado) {
    let temp = new Auto(
      literal.marca,
      literal.anio,
      literal.tipo,
      literal.puertas,
      literal.combustible,
      literal.aire,
      literal.esp,
      literal.techo,
      literal.img,
      literal.id,
      literal.precio
    );
    carrito.push(temp);
  }
  mostrarCarrito(1);
}

//funcion que agrega productos al array del carrito
function agregarCarrito(e) {
  if (carrito.some((el) => el.id == e.id)) {
    Swal.fire(
      "El vehiculo ya se encuentra en favoritos",
      "se dejo en favoritos",
      "info"
    );
  } else {
    carrito.push(e);
    Toastify({
      text: "Auto agregado!",
      duration: 3000,
    }).showToast();
    mostrarCarrito(0);
  }
}

function sacarCarrito(e) {
  carrito = carrito.filter((el) => e.id != el.id);
  Toastify({
    text: "Auto olvidado!",
    duration: 3000,
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
    button.class = "dropdown-item ";
    button.innerText = item.marca + item.anio;
    let carritoButtonRemove = document.createElement("a");
    carritoButtonRemove.className = "btn btn-danger btn-sm center";
    carritoButtonRemove.id = "btnrmv" + item.id;
    carritoButtonRemove.text = "X";
    let carritoButtonReservar = document.createElement("a");
    carritoButtonReservar.className = "btn btn-success btn-sm center";
    carritoButtonReservar.id = "btnres" + item.id;
    carritoButtonReservar.text = "Reservar";
    li.appendChild(button);
    li.appendChild(carritoButtonRemove);
    li.appendChild(carritoButtonReservar);
    carritoDom.appendChild(li);
  }
  ejecucion != 1
    ? localStorage.setItem("listacarr", JSON.stringify(carrito))
    : "";
  carrito.forEach((auto) => {
    document
      .getElementById("btnrmv" + auto.id)
      .addEventListener("click", function () {
        sacarCarrito(auto);
      });
  });
  carrito.forEach((auto) => {
    document
      .getElementById("btnres" + auto.id)
      .addEventListener("click", function () {
        reservarAuto(auto);
      });
  });
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
    cardH5.className = "card-title titulotarjeta";
    cardH5.innerText = autos.marca + " " + autos.anio;
    let cardP = document.createElement("p");
    cardP.className = "card-text";
    let detalle = autos.puertas + ", " + autos.combustible + ", " + autos.tipo;
    autos.aire == true && (detalle += ", aire acondicionado");
    autos.esp && (detalle += ", Control de estabilidad");
    autos.techo && (detalle += ", Techo corredizo");
    detalle+= "\n $ " + autos.precio;
    cardP.innerText = detalle;
    let cardButton = document.createElement("a");
    cardButton.className = "btn btn-primary start";
    cardButton.id = "agregar" + autos.id;
    cardButton.text = "Me gusta!";
    let cardButtonReserva = document.createElement("a");
    cardButtonReserva.className = "btn btn-success  end";
    cardButtonReserva.id = "reservar" + autos.id;
    cardButtonReserva.text = "Reservar";
    cardBody.appendChild(cardH5);
    cardBody.appendChild(cardP);
    cardBody.appendChild(cardButton);
    cardBody.appendChild(cardButtonReserva);
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    contenedor.appendChild(card);
    resultadosFiltro.appendChild(contenedor);
  }
  array.forEach((auto) => {
    document.getElementById("agregar" + auto.id).addEventListener("click", function () {
      agregarCarrito(auto);
    }
    );
    document.getElementById("reservar" + auto.id).addEventListener("click", function () {
      reservarAuto(auto);
    }
    );
  });
}

//funcion nueva que limpia los select
function limpiarSelects() {
  const select = document.getElementsByClassName("form-select");
  const checks = document.getElementsByClassName("form-check-input");
  for (i = 0; i < select.length; i++) {
    select[i].innerHTML = "";
  }
  for (let i = 0; i < checks.length; i++) {
    checks[i].checked = false;
  }
}

//funcion para la carga de los select de acuerdo a las categorias y al inventario disponible
function cargarSelects(arrayPantalla) {
  limpiarSelects();
  for (const select of arraySelects) {
    if (select.tipo == "marca") {
      if (
        arrayPantalla.some((el) => el.marca == select.valor) ||
        select.valor == "Todos"
      ) {
        let option = document.createElement("option");
        option.innerText = select.valor;
        let contenedorSelect = document.getElementById(select.tipo);
        contenedorSelect.appendChild(option);
      }
    } else if (select.tipo == "tipo") {
      if (
        arrayPantalla.some((el) => el.tipo == select.valor) ||
        select.valor == "Todos"
      ) {
        let option = document.createElement("option");
        option.innerText = select.valor;
        let contenedorSelect = document.getElementById(select.tipo);
        contenedorSelect.appendChild(option);
      }
    } else if (select.tipo == "ptas") {
      if (
        arrayPantalla.some((el) => el.puertas == select.valor) ||
        select.valor == "Todos"
      ) {
        let option = document.createElement("option");
        option.innerText = select.valor;
        let contenedorSelect = document.getElementById(select.tipo);
        contenedorSelect.appendChild(option);
      }
    } else if (select.tipo == "comb") {
      if (
        arrayPantalla.some((el) => el.combustible == select.valor) ||
        select.valor == "Todos"
      ) {
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

  marca.options[marca.selectedIndex].value != "Todos" &&
    (resultado = resultado.filter(
      (el) =>
        el.marca.toLowerCase() ==
        marca.options[marca.selectedIndex].value.toLowerCase()
    ));
  tipo.options[tipo.selectedIndex].value != "Todos" &&
    (resultado = resultado.filter(
      (el) =>
        el.tipo.toLowerCase() ==
        tipo.options[tipo.selectedIndex].value.toLowerCase()
    ));
  comb.options[comb.selectedIndex].value != "Todos" &&
    (resultado = resultado.filter(
      (el) =>
        el.combustible.toLowerCase() ==
        comb.options[comb.selectedIndex].value.toLowerCase()
    ));
  ptas.options[ptas.selectedIndex].value != "Todos" &&
    (resultado = resultado.filter(
      (el) =>
        el.puertas.toLowerCase() ==
        ptas.options[ptas.selectedIndex].value.toLowerCase()
    ));
  aire.checked && (resultado = resultado.filter((el) => el.aire == true));
  techo.checked && (resultado = resultado.filter((el) => el.techo == true));
  esp.checked && (resultado = resultado.filter((el) => el.esp == true));

  if (resultado.length == 0) {
    Swal.fire(
      "La busqueda no arrojo resultados",
      "se cargaran los autos nuevamente",
      "info"
    );
    cargarPantalla(arrayAutos);
    cargarSelects(arrayAutos);
  } else {
    cargarPantalla(resultado);
  }
}

function reservarAuto(auto) {
  //detalle del auto
  let contenedorCheckout = document.getElementById("cuerpo");
  contenedorCheckout.innerHTML = "";
  let sectionPrincipal = document.createElement("section");
  sectionPrincipal.className = "h-100 h-custom";
  sectionPrincipal.style = "background-color: #eee;";
  let div1 = document.createElement("div");
  div1.className = "container h-100 py-5";
  let div2 = document.createElement("div");
  div2.className = "row d-flex justify-content-center align-items-center h-100";
  let div3 = document.createElement("div");
  div3.className = "col";
  let div4 = document.createElement("div");
  div4.className = "card shopping-cart";
  div4.style = "border-radius: 15px;";
  let div5 = document.createElement("div");
  div5.className = "card-body text-black";
  let div6 = document.createElement("div");
  div6.className = "row";
  let div7 = document.createElement("div");
  div7.className = "col-lg-6 px-5 py-4";
  let title = document.createElement("h3");
  title.style = "color:black;";
  title.innerText = "Reserva de Vehiculo";
  div7.appendChild(title);
  let divProd1;
  divProd1 = document.createElement("div");
  divProd1.className = "d-flex align-items-center mb-5";
  let divProd2 = document.createElement("div");
  divProd2.className = "flex-shrink-0";
  let imageProd = document.createElement("img");
  imageProd.src = "assets/images/" + auto.img + ".jpg";
  imageProd.className = "img-fluid";
  imageProd.style = "width: 450px;";
  imageProd.alt = "Generic image";
  divProd2.appendChild(imageProd);
  let divProd3 = document.createElement("div");
  divProd3.className = "flex-grow-1 ms-3";
  divProd3.innerHTML = `<a href="#!" class="float-end text-black"><i class="fas fa-times"></i></a>
        <h3 class="text-primary">${auto.marca} ${auto.anio} ${auto.combustible}</h3`;
  let divProd4 = document.createElement("div");
  divProd4.className = "d-flex align-items-center";
  divProd4.innerHTML = `<p class="fw-bold mb-0 me-5 pe-3">${auto.precio}$</p>`;
  let divProd5 = document.createElement("div");
  divProd5.className = "def-number-input number-input safari_only";
  divProd4.appendChild(divProd5);
  divProd3.appendChild(divProd4);
  divProd2.appendChild(divProd3);
  divProd1.appendChild(divProd2);
  divProd1.appendChild(divProd2);
  div7.appendChild(divProd1);

  divTotal = document.createElement("div");
  divTotal.id = "divTotal";
  divTotal.className = "d-flex justify-content-between p-2 mb-2";
  divTotal.style = "background-color: #e1f5fe;";
  let reserva = (parseInt(auto.precio) * 30) / 100;
  divTotal.innerHTML = `<h4 class="fw-bold mb-0 totales">Valor de reserva:</h4>
    <h4 class="fw-bold mb-0 totales">${reserva}$</h4>
    `;
  div7.append(divTotal);

  //detalle del metodo de pago
  let div8 = document.createElement("div");
  div8.className = "col-lg-6 px-5 py-4";
  div8.innerHTML = `
    <h3 class="mb-5 pt-2 text-center fw-bold text-uppercase" style="color:black;">Pago</h3>
                  <form class="mb-5">
                  <div class="form-outline mb-5">
                  <input type="email" id="email" name="email" id="typemail" class="form-control form-control-lg" siez="17"
                    value="" minlength="5" maxlength="99" />
                  <label class="form-label" for="typeText">Ingrese su mail</label>
                </div>
                <div class="form-outline mb-5">
                      <input type="text" id="typeText" class="form-control form-control-lg" siez="17"
                        value="1111 2222 3333 4444" minlength="19" maxlength="19" />
                      <label class="form-label" for="typeText">Numero de tarjeta</label>
                    </div>
                    <div class="form-outline mb-5">
                      <input type="text" id="typeName" class="form-control form-control-lg" siez="17"
                        value="Juan Perez" />
                      <label class="form-label" for="typeName">Nombre como figura en la tarjeta</label>
                    </div>
                    <div class="row">
                      <div class="col-md-6 mb-5">
                        <div class="form-outline">
                          <input type="text" id="typeExp" class="form-control form-control-lg" value="01/22"
                            size="7" id="exp" minlength="7" maxlength="7" />
                          <label class="form-label" for="typeExp">Fecha de expiracion</label>
                        </div>
                      </div>
                      <div class="col-md-6 mb-5">
                        <div class="form-outline">
                          <input type="password" id="typeText" class="form-control form-control-lg"
                            value="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" />
                          <label class="form-label" for="typeText">Cvv</label>
                        </div>
                      </div>
                    </div>
                    <button type="button" id="fin" class="btn btn-warning btn-block btn-lg">Confirmar</button>
  
                    <h5 class="fw-bold mb-5" style="position: absolute; bottom: 0;">
                      <a href="index.html" id="volver"><i class="fas fa-angle-left me-2"></i>Volver a la seleccion</a>
                    </h5>`;

  div6.appendChild(div7);
  div6.appendChild(div8);
  div5.appendChild(div6);
  div4.appendChild(div5);
  div3.appendChild(div4);
  div2.appendChild(div3);
  div1.appendChild(div2);
  sectionPrincipal.appendChild(div1);

  contenedorCheckout.appendChild(sectionPrincipal);

  let fin = document.getElementById("fin");
  fin.addEventListener("click", () => {
    let mail = document.getElementById("email").value;
    if (validarCorreo(mail)) {
      Swal.fire("Usted reservo el auto, recibira los detalles en su mail");
      
      var templateParams = {
        correo: mail,
        marca: auto.marca,
        anio: auto.anio,
        combustible: auto.combustible,
        precio: auto.precio,
        reserva: reserva,
      };

      emailjs.init("qO6vBxY3qj1kt6g7l");
      emailjs.send("default_service", "template_atamx5h", templateParams).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
      sacarCarrito(auto);

      setTimeout(() => {
        window.location.replace("index.html");
      }, 2000);
    }
    else{
      Swal.fire("Ingrese un correo Valido");
    }
  });
}

function validarCorreo(correo) {
  var expReg =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  let esMail = expReg.test(correo);
  return esMail;
}
