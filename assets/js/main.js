//clases

class Cliente {
    constructor(nom, pcia, marca, busq) {
        this.nom = nom;
        this.pcia = pcia;
        this.marca = marca;
        
    }
    mostrarBienvenida() {
        alert("Bienvenido a AutoLuc " + this.nom + ", usted nos visita desde " + this.pcia + ", tiene un " + this.marca + "\n" + "COMENCEMOS!");
        console.log("cliente " + this.nom);
        console.log("provincia " + this.pcia);
        console.log("marca " + this.marca);
        
    }
}

class Auto {
    constructor(marca,anio, tipo, puertas, combustible,aire,esp,techo,img) {
        this.marca = marca;
        this.anio = parseInt(anio);
        this.tipo = tipo;
        this.puertas = puertas;
        this.combustible = combustible;
        this.aire = aire;
        this.esp = esp;
        this.techo = techo;
        this.img = img;
    }
    
}

class Selects {
    constructor(tipo, valor){
        this.tipo = tipo;
        this.valor = valor;
    }
}

//codigo central
const arrayAutos = [];
arrayAutos.push(new Auto("Ford",2016, "Sedan", "4 ptas", "Diesel",true, true,false,"ford"));
arrayAutos.push(new Auto("Ford",2018, "Hatchback", "5 ptas", "Nafta",true,false, true,"ford"));
arrayAutos.push(new Auto("VW", 2013,"Coupe", "3 ptas", "Nafta",true,true,false,"vw"));
arrayAutos.push(new Auto("Fiat",2010, "Hatchback", "5 ptas", "GNC",false,true,true,"fiat"));
arrayAutos.push(new Auto("Fiat",2012,"Sedan", "4 ptas", "Diesel",true,false,true,"fiat"));
arrayAutos.push(new Auto("VW",2016, "Hatchback", "5 ptas", "Nafta",true,false, true,"vw"));
arrayAutos.push(new Auto("Ford",2017, "Coupe", "3 ptas", "Nafta",true,false,true,"ford"));
arrayAutos.push(new Auto("VW",2018, "Hatchback", "5 ptas", "GNC",true, true,false,"vw"));
arrayAutos.push(new Auto("VW",2020, "Sedan", "4 ptas", "Diesel",true,false, true,"vw"));
arrayAutos.push(new Auto("Fiat",2010, "Hatchback", "5 ptas", "Nafta",true,false,true,"fiat"));
arrayAutos.push(new Auto("Fiat",2012, "Coupe", "3 ptas", "Nafta",true, true,false,"fiat"));
arrayAutos.push(new Auto("Ford",2013, "Hatchback", "5 ptas", "GNC",true,false, true,"ford"));
arrayAutos.push(new Auto("Fiat",2010, "Hatchback", "5 ptas", "Nafta",true,true,true,"fiat"));
arrayAutos.push(new Auto("Fiat",2012, "Coupe", "3 ptas", "Nafta",true, true,false,"fiat"));
arrayAutos.push(new Auto("Ford",2013, "Hatchback", "5 ptas", "GNC",true,true, true,"ford"));
console.log(arrayAutos);

const arraySelects = [];
arraySelects.push(new Selects("marca", "Todos"));
arraySelects.push(new Selects("marca", "Ford"));
arraySelects.push(new Selects("marca", "Fiat"));
arraySelects.push(new Selects("marca", "VW"));
arraySelects.push(new Selects("marca", "Toyota"));
arraySelects.push(new Selects("tipo", "Todos"));
arraySelects.push(new Selects("tipo", "Hatchback"));
arraySelects.push(new Selects("tipo", "Sedan"));
arraySelects.push(new Selects("tipo", "Camioneta"));
arraySelects.push(new Selects("tipo", "Coupe"));
arraySelects.push(new Selects("ptas", "Todos"));
arraySelects.push(new Selects("ptas", "3 ptas"));
arraySelects.push(new Selects("ptas", "4 ptas"));
arraySelects.push(new Selects("ptas", "5 ptas"));
arraySelects.push(new Selects("comb", "Todos"));
arraySelects.push(new Selects("comb", "Nafta"));
arraySelects.push(new Selects("comb", "Diesel"));
arraySelects.push(new Selects("comb", "GNC"));

cargarSelects();
cargarPantalla(arrayAutos);
botonSearch = document.getElementById("botonbusqueda");
botonSearch.onclick = () => filtrarBusqueda();








//funciones
function valida(dato, tipoDato) {
    if (tipoDato == "marca") {
        if (dato.toLowerCase() != "ford" && dato.toLowerCase() != "vw" && dato.toLowerCase() != "fiat") {
            return false;
        }
        else {
            return true;
        }
    }
    else if(tipoDato == "combustible")
    {
        if (dato.toLowerCase() != "nafta" && dato.toLowerCase() != "diesel" && dato.toLowerCase() != "gnc") {
            return false;
        }
        else {
            return true;
        }
    }
}

function solProv()
{   
    let pcia = prompt("Ingrese de que provinvia nos visita (Bs.As. - Santa Fe - Cordoba - Mendoza - Otra)")
    while (pcia.toLowerCase() != "bs.as." &&  pcia.toLowerCase() != "santa fe" && pcia.toLowerCase() != "cordoba" && pcia.toLowerCase() != "mendoza" && pcia.toLowerCase() != "otra")
    {
        pcia = prompt("La provincia ingresada no es valida. Informe alguna de las siguientes opciones Bs.As. - Santa Fe - Cordoba - Mendoza - Otra")
    }
    return pcia;
}

function solMarca()
{   
    let marca = prompt("Ingrese la marca de su vehiculo (Ford - Renault - VW - Fiat - Otra)")
    while (marca.toLowerCase() != "ford" &&  marca.toLowerCase() != "renault" && marca.toLowerCase() != "vw" && marca.toLowerCase() != "fiat" && marca.toLowerCase() != "otra")
    {
        marca = prompt("La marca ingresada no es valida. Informe alguna de las siguientes opciones Ford - Renault - VW - Fiat - Otra")
    }
    return marca;
}

function cargarPantalla(array){
    let resultadosFiltro = document.getElementById("resultadosBusqueda");
    resultadosFiltro.innerHTML="";
    let contenedor;
    
    for (const autos of array) {
        contenedor = document.createElement("div");
        let card = document.createElement("article");
        card.className = "card busquedaresults__card";
        let cardImg = document.createElement("img");
        cardImg.src="assets/images/" + autos.img + ".jpg";
        cardImg.className= "card-img-top";
        cardImg.alt= "Auto en venta";
        let cardBody = document.createElement("div");
        cardBody.className="card-body";
        let cardH5 = document.createElement("h5");
        cardH5.className="card-title titulotarjeta"
        cardH5.innerText=autos.marca + " " + autos.anio;
        let cardP=document.createElement("p");
        cardP.className="card-text";
        let detalle = autos.puertas + ", " + autos.combustible ;
        if (autos.aire == true){
            detalle += ", aire acondicionado";
        }
        if (autos.esp){
            detalle+=", Control de estabilidad";
        }
        if (autos.techo){
            detalle+= ", Techo corredizo";
        }
        cardP.innerText=detalle;
        cardBody.appendChild(cardH5);
        cardBody.appendChild(cardP);
        card.appendChild(cardImg);
        card.appendChild(cardBody);
        contenedor.appendChild(card);
        resultadosFiltro.appendChild(contenedor);
        console.log("contenedor");
    
    }
    
    console.log("llegue");
    
    }

function cargarSelects(){
    for (const select of arraySelects) {
        let option = document.createElement("option");
        option.innerText = select.valor;
        let contenedorSelect = document.getElementById(select.tipo);
        contenedorSelect.appendChild(option);
    }

}

function filtrarBusqueda()
{   let resultado = arrayAutos;
    let marca = document.getElementById("marca");
    let tipo = document.getElementById("tipo");
    let comb = document.getElementById("comb");
    let ptas = document.getElementById("ptas");
    let aire = document.getElementById("aire");
    let techo = document.getElementById("techo");
    let esp = document.getElementById("esp");
   
console.log(marca.options[marca.selectedIndex].value, tipo.options[tipo.selectedIndex].value ,comb.options[comb.selectedIndex].value, ptas.options[ptas.selectedIndex].value, aire.checked,techo.checked,esp.checked );


    if(marca.options[marca.selectedIndex].value !="Todos")
        {resultado = resultado.filter((el) => el.marca.toLowerCase() == marca.options[marca.selectedIndex].value.toLowerCase());
        console.log("entre marca", resultado);};
    if(tipo.options[tipo.selectedIndex].value!="Todos")
        {resultado = resultado.filter((el) => el.tipo.toLowerCase() == tipo.options[tipo.selectedIndex].value.toLowerCase());
            console.log("entre tipo",resultado);};
    if(comb.options[comb.selectedIndex].value!="Todos")
        {resultado = resultado.filter((el) => el.combustible.toLowerCase() == comb.options[comb.selectedIndex].value.toLowerCase());
            console.log("entre comb",resultado);};
    if(ptas.options[ptas.selectedIndex].value!="Todos")
        {resultado = resultado.filter((el) => el.puertas.toLowerCase() == ptas.options[ptas.selectedIndex].value.toLowerCase());
            console.log("entre ptas");};
    if(aire.checked)
        {resultado = resultado.filter((el) => el.aire == true);
            console.log("entre aire");};
    if(techo.checked)
        {resultado = resultado.filter((el) => el.techo == true);
            console.log("entre techo");};
    if(esp.checked)
        {resultado = resultado.filter((el) => el.esp == true);
            console.log("entre esp");};
    console.log(resultado);
    cargarPantalla(resultado);
}