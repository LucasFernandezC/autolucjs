//clases
class cliente{
    constructor(nom, pcia, marca, busq)
    {
        this.nom = nom;
        this.pcia= pcia;
        this.marca = marca;
        this.busq = busq;
    }
    mostrarBienvenida(){
        alert("Bienvenido a AutoLuc " + this.nom + ", usted nos visita desde " + this.pcia + ", tiene un " + this.marca + ", y busca una " + this.busq);
        console.log("cliente " +this.nom );
        console.log("provincia " + this.pcia);
        console.log("marca " + this.marca);
        console.log("busca " + this.busq);
    }
}

//codigo central
let nombre = prompt("Cual es su nombre?");
let pcia = solProv();
let marca = solMarca();
let busqueda = solBusq();
const cliente1 = new cliente(nombre, pcia, marca, busqueda);
cliente1.mostrarBienvenida();

//Funciones
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

function solBusq()
{   
    let busqueda = prompt("Ingrese su busqueda (Compra - Permuta - Venta)")
    while (busqueda.toLowerCase() != "compra" &&  busqueda.toLowerCase() != "permuta" && busqueda.toLowerCase() != "venta")
    {
        busqueda = prompt("Opcion no valida. Informe alguna de las siguientes opciones Compra - Permuta - Venta")
    }
    return busqueda;
}