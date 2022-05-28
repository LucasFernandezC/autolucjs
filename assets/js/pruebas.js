let cantidad;
let suma;
let ingreso;
ingreso = parseFloat(prompt("Ingrese la nota"));

//valido que al menos la primer carga sea numerica - Restaria validar que el valor ingresado este dentro de la escala establecida (se haria con una funcion que se encargue de eso)
while(isNaN(ingreso))
    {
        console.log("el dato ingresado no es un numero" + ingreso);
        ingreso = parseFloat(prompt("El dato ingresado no es numerico! Ingrese la nota:"));
        
    }

suma = 0;
cantidad = 0;

//proceso datos hasta que se ingrese algo que no sea numerico
while(!isNaN(ingreso))
    {
        suma = suma + ingreso;
        cantidad++;
        console.log("la nota " + cantidad + "es: " + ingreso);
        ingreso = parseFloat(prompt("Ingrese la nota, para salir ingrese cualquier caracter"));
        
    }
console.log("La cantidad de notas ingresada es: " + cantidad + ". El promedio es:" + (suma/cantidad));
alert("El promedio de la clase es: " + (suma/cantidad));
