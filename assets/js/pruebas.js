let ingreso = []
ingreso=prompt("Ingrese la frase");

let caracteresIngreso=[];
let arrayIngreso=[];

for (let i = 0; i < ingreso.length; i++) {
    if(caracteresIngreso.find(element => element == ingreso[i]) )
    {
        arrayIngreso.push(ingreso[i]);
    }
    else
    {
        caracteresIngreso.push(ingreso[i]);
        arrayIngreso.push(ingreso[i]);
        
    }
    
}
contarCaracteres();
alert("la cantidad total de caracteres es:"+ ingreso.length);


//funciones
function contarCaracteres() 
{   
    for (const letra of caracteresIngreso) {
        console.log(arrayIngreso);
        let temporal= arrayIngreso.filter((n) => n == letra);
    
        alert("la cantidad de " + letra + " que hay es: "+ temporal.length);
    }
    
    
}