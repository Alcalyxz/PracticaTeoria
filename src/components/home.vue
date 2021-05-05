<template>
  <div>
    <h1>Practica 1 Teoría del Lenguaje de Compiladores.</h1>
    <br />
    <input type="text" v-model="codigo" />
    <button @click="leerCodigo">Leer codigo</button>
    <button @click="imprimirlista">imprimir lista</button>

    <br />
    <br />
    <br />
    <br />

    <textarea
      name="textarea"
      rows="10"
      cols="50"
      v-model="impresion"
    ></textarea>
  </div>
</template>

<script>
import listasLigadas from "../listasLigadas/listasLigadas";
export default {
  name: "home",
  data() {
    return {
      lista: null,
      codigo: "",
      termine: false,
      keyword: ["if", "while", "var", "for", "let", "final"],
      separador: ["(", ")", ";", "{", "}", "[", "]", ","],
      operador: ["+", "-", "*", "/", "%", "==", "!=", "<=", ">=", "="],
      numero: ["0", "1", "2", "3", "4", "5", "6", "7", "8","9"],
      impresion: "",
    };
  },
  methods: {
    leerCodigo() {
      this.codigo = this.codigo + "";

      //Recorrer el codigo para analizar cada uno de los posibles tipos de valores
      for (var i = 0; i <= this.codigo.length; i++) {
        var palabra = this.codigo.slice(0, i).toString();
        console.log(palabra + " iteracion numero: " + i);

        //Recorrer los Keywords Para saber si pertenecen a alguno
        for (var j = 0; j < this.keyword.length; j++) {
          if (this.keyword[j] == palabra) {
            console.log("ENCONTRE KEYWORD");
            var token = {
              type: "keyword",
              value: palabra,
            };
            this.lista.agregar(token);

            this.codigo = this.codigo.slice(i);
            i = 0;
            palabra = this.codigo.slice(0, i).toString();
            console.log(this.codigo);
            break;
          }
        }

        //Recorrer los Operadores Para saber si pertenecen a alguno
        for (var y = 0; y < this.operador.length; y++) {
          if (this.operador[y] == palabra.toString()) {
            console.log("ENCONTRE OPERADOR!");
            var token5 = {
              type: "Operador",
              value: palabra,
            };
            this.lista.agregar(token5);

            this.codigo = this.codigo.slice(i);
            i = 0;
            palabra = this.codigo.slice(0, i).toString();
            console.log(this.codigo);
            break;
          }
        }

        //Recorrer los Separadores Para saber si pertenecen a alguno
        for (var k = 0; k < this.separador.length; k++) {
          if (this.separador[k] == palabra) {
            console.log("ENCONTRE SEPARADOR");
            var token1 = {
              type: "separador",
              value: palabra,
            };
            this.lista.agregar(token1);

            this.codigo = this.codigo.slice(i);
            i = 0;
            palabra = this.codigo.slice(0, i).toString();
            break;
          }
        }

        //Enconrtar si es un String
        if (this.codigo[i] == '"') {
          console.log(this.codigo[i]);
          var texto = '"';
          for (var p = 1; p < this.codigo.length; p++) {
            if (this.codigo[p] != '"') {
              texto = texto + this.codigo[p];
            } else {
              var token3 = {
                type: "char/string",
                value: texto + '"',
              };

              console.log("ENCONTRE UNA CADENAAAA");

              this.lista.agregar(token3);

              this.codigo = this.codigo.slice(p + 1);
              i = 1;
              palabra = this.codigo.slice(1, i).toString();
              break;
            }
          }
        }

        if (this.codigo.slice(0, 1) == " ") {
          var token7 = {
            type: "espacio",
            value: '" "',
          };
          console.log("ENCONTRE ESPACIOOOOOO PRIMER NIVEL 1" + i);
          this.lista.agregar(token7);
          this.codigo = this.codigo.slice(1);
          i = 0;
          palabra = this.codigo.slice(0, i).toString();

          //palabra = this.codigo.slice(1).toString();
        }
        if (this.codigo[i] == " " && this.codigo.slice(0, i) != "") {
          var token8 = {
            type: "identify",
            value: this.codigo.slice(0, i),
          };
          console.log("ENCONTRE IdentiFYYYYY");

          this.lista.agregar(token8);

          this.codigo = this.codigo.slice(i);
          i = 0;
          palabra = this.codigo.slice(0, i).toString();

          console.log(this.codigo);

          //palabra = this.codigo.slice(1).toString();
        }
         if (this.codigo[i + 1] == null) {
          var token9 = {
            type: "identify",
            value: this.codigo.slice(0, i),
          };
          console.log("ENCONTRE IdentiFYYYYY");

          this.lista.agregar(token9);

          this.codigo = this.codigo.slice(i);
          i = 0;
          palabra = this.codigo.slice(0, i).toString();

          console.log(this.codigo);

          //palabra = this.codigo.slice(1).toString();
        } 


        if (this.numero.includes(this.codigo[i].toString())) {
          
          var numerito = "";
          for (var g = 0; g < this.codigo.length; g++) {
            if (this.numero.includes(this.codigo[g].toString())) {
              numerito = numerito + this.codigo[g].toString();
            } else {
              var token15 = {
                type: "Number",
                value: numerito,
              };

              console.log("ENCONTRE UN Numero");

              this.lista.agregar(token15);

              this.codigo = this.codigo.slice(g);
              i = 0;
              palabra = this.codigo.slice(0, i).toString();
              break;
            }
          }
        }
      }

      //Verificar si es un espacio
      if (this.codigo.slice(0, 1) == " ") {
        var token2 = {
          type: "espacio",
          value: '" "',
        };
        console.log("ENCONTRE ESPACIOOOOOO");
        this.lista.agregar(token2);
        this.codigo = this.codigo.slice(1);
        //palabra = this.codigo.slice(1).toString();
      }

      if (this.codigo != "") {
        this.leerCodigo();
      }
    },
    imprimirlista() {
      this.impresion = "";
      let elemento = this.lista.primero;
      this.impresion = this.impresion + "Tipo:" + elemento.token.type + " " + "Valor:" + elemento.token.value + " -> \n";
      console.log(elemento);
      if (!elemento) console.log("No hay elementos en la lista");

      while (elemento.siguiente) {
        elemento = elemento.siguiente;

        if(elemento.token.value != "" ){
          this.impresion = this.impresion + "Tipo:" + elemento.token.type + " " + "Valor:" + elemento.token.value + " -> \n";
        }
        
      }
    },
  },
  mounted() {
    this.lista = listasLigadas;
  },
};
</script>
<style scoped>
</style>
