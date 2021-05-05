class Elemento
{
  siguiente = null;
  token = {
    type: "",
    value: ""
  };
  constructor(token) {
    this.token = token;
  }
}


class ListaEnlazada
{
  primero = null;
  ultimo = null;
 
  agregar = (token) => {
    const elemento = new Elemento(token);
 
    if (!this.primero) {
      this.primero = elemento;
      this.ultimo = elemento;
      return;
    }
    this.ultimo.siguiente = elemento;
    this.ultimo = elemento;
  }
}


const lista = new ListaEnlazada();
/*
var token1={
  type: "keyword",
  value: "int"
}

var token2={
  type: "identify",
  value: "saludo"
}

var token3={
  type: "separador",
  value: "{"
}
 
lista.agregar(token1);
lista.agregar(token2);
lista.agregar(token3);
 */

export default (lista);