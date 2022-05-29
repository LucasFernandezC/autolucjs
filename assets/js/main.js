//clases

class cliente {
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

class auto {
    constructor(marca, tipo, puertas, combustible) {
        this.marca = marca;
        this.tipo = tipo;
        this.puertas = puertas;
        this.combustible = combustible;
    }
    
}

//codigo central
const arrayAutos = [];
arrayAutos.push(new auto("Ford", "Sedan", "4 ptas", "Diesel"));
arrayAutos.push(new auto("Ford", "Hatchback", "5 ptas", "Nafta"));
arrayAutos.push(new auto("VW", "Coupe", "3 ptas", "Nafta"));
arrayAutos.push(new auto("Fiat", "Hatchback", "5 ptas", "GNC"));
arrayAutos.push(new auto("Fiat", "Sedan", "4 ptas", "Diesel"));
arrayAutos.push(new auto("VW", "Hatchback", "5 ptas", "Nafta"));
arrayAutos.push(new auto("Ford", "Coupe", "3 ptas", "Nafta"));
arrayAutos.push(new auto("VW", "Hatchback", "5 ptas", "GNC"));
arrayAutos.push(new auto("VW", "Sedan", "4 ptas", "Diesel"));
arrayAutos.push(new auto("Fiat", "Hatchback", "5 ptas", "Nafta"));
arrayAutos.push(new auto("Fiat", "Coupe", "3 ptas", "Nafta"));
arrayAutos.push(new auto("Ford", "Hatchback", "5 ptas", "GNC"));
console.log(arrayAutos);

let nombre = prompt("Cual es su nombre?");
let pcia = solProv();
let marca = solMarca();
const cliente1 = new cliente(nombre, pcia, marca);
cliente1.mostrarBienvenida();

if (confirm("Desea buscar un vehiculo en nuestra pagina?")) {
    if (confirm("Desea buscar por Marca?")) {
        do {
            paramBusqueda = prompt("Ingrese la marca que desea (FORD, VW, Fiat)")
        } while (!valida(paramBusqueda, "marca"))
        const resultado = arrayAutos.filter((el) => el.marca.toLowerCase() == paramBusqueda.toLowerCase());
        console.log(resultado);
        let resultadoPantalla = "";
        for (const elemento of resultado) {
            resultadoPantalla += "Marca: " + elemento.marca + " Tipo: " + elemento.tipo + " Puertas: " + elemento.puertas + " Combustible: " + elemento.combustible + "\n";
        }
        alert("Estos son los autos que tenemos para ofrecerle" + "\n" + resultadoPantalla);
    }
    else if(confirm("Desea Buscar por Combustible?"))
    {
        do {
            paramBusqueda = prompt("Ingrese el combustible que desa (Nafta, GNC, Diesel)")
        } while (!valida(paramBusqueda, "combustible"))
        const resultado = arrayAutos.filter((el) => el.combustible.toLowerCase() == paramBusqueda.toLowerCase());
        console.log(resultado);
        let resultadoPantalla = "";
        for (const elemento of resultado) {
            resultadoPantalla += "Marca: " + elemento.marca + " Tipo: " + elemento.tipo + " Puertas: " + elemento.puertas + " Combustible: " + elemento.combustible + "\n";
        }
        alert("Estos son los autos que tenemos para ofrecerle" + "\n" + resultadoPantalla);
    }
    else
    {
        alert("Muchas gracias por visitar nuestro sitio");
    }
}
else
    {
        alert("Muchas gracias por visitar nuestro sitio");
    }


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