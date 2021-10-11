<template>
  <div class="todo">
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap"
      rel="stylesheet"
    />
    <div class="titulos">
      <h1 class="titulo">¡Practica 1 Teoría del Lenguaje de Compiladores!</h1>
    </div>

    <br />

    <div class="cajas">
      <div class="inputs">
        <input
          placeholder="Ingrese el Código"
          class="cajaTexto"
          type="text"
          v-model="codigo"
        />
      </div>
      <br />

      <div class="boton">
        <button class="botones" @click="leerCodigo">
          1. Analizador Léxico
        </button>
        <button class="botones" @click="imprimirlista">
          2. Imprimir Lista Tokens
        </button>
        <button class="botones" @click="analizarTokens">
          3. Analizador de Sintaxis
        </button>
      </div>

      <div v-if="openRespuesta">
        <h2>RESPUESTA:</h2>
        <h3 v-if="acepte == false">
          Está incorrecta la Sintaxis: {{ informacion }}
        </h3>
        <h3 v-if="acepte == true">Está Correcta la Sintaxis</h3>
      </div>

      <div class="textarea">
        <textarea
          class="texto"
          name="textarea"
          rows="10"
          cols="50"
          v-model="impresion"
        ></textarea>
      </div>

      <h4 class="creditos">By JuanPabloPosadaSepúlveda & DanielQuiroz</h4>

      <p>Ejemplos (Copiar y Pegar) :</p>

      <ul>
        <li>var buenosDias == "BuenosDias";</li>
        <li>for while if []{}() 575;</li>
        <li>for (var m = 0; m >= 100; m ++);</li>
        <li>if ( holi != "Holi" ) {};</li>
      </ul>
    </div>
  </div>
</template>

<script>
import listasLigadas from "../listasLigadas/listasLigadas";
export default {
  name: "home",
  data() {
    return {
      lista: null,
      acepte: true,
      openRespuesta: false,
      informacion: "",
      codigo: "",
      termine: false,
      keyword: ["if", "while", "var", "for", "let", "final", "const"],
      separador: ["(", ")", ";", "{", "}", "[", "]", ","],
      operador: ["+", "-", "*", "/", "%", "==", "!=", "<=", ">="],
      numero: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      asignacion: ["="],
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

        /* for (var m = 0; m < this.operador.length; m++) {
          if (this.asignacion[m] == palabra.toString()) {
            console.log("ENCONTRE Asignacion!");
            var token70 = {
              type: "Asignacion",
              value: palabra,
            };
            this.lista.agregar(token70);
            this.codigo = this.codigo.slice(i);
            i = 0;
            palabra = this.codigo.slice(0, i).toString();
            console.log(this.codigo);
            break;
          }
        } */

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
            type: "Ultimo",
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
      this.impresion =
        this.impresion +
        "Tipo: " +
        elemento.token.type +
        " " +
        "Valor: " +
        elemento.token.value +
        " -> \n";
      console.log(elemento);
      if (!elemento) console.log("No hay elementos en la lista");

      while (elemento.siguiente) {
        elemento = elemento.siguiente;

        if (elemento.token.value != "") {
          this.impresion =
            this.impresion +
            "Tipo: " +
            elemento.token.type +
            " " +
            "Valor: " +
            elemento.token.value +
            " -> \n";
        }
      }
    },
    analizarTokens() {
      let iterador = this.lista.primero;
      let primero = this.lista.primero;
      let ultimo = this.lista.ultimo;

      if (primero.token.type == "char/string") {
        this.acepte = false;
        this.informacion =
          "El primero elemento de una secuencia JS no puede ser un String";
      }

      if (primero.token.type == "separador") {
        this.acepte = false;
        this.informacion =
          "El primero elemento de una secuencia JS no puede ser un Separador";
      }

      if (primero.token.type == "Operador") {
        this.acepte = false;
        this.informacion =
          "El primero elemento de una secuencia JS no puede ser un Operador";
      }

      while (iterador.siguiente) {
        if (iterador.token.type == "keyword") {
          if (iterador.siguiente.token.type == "espacio") {
            if (iterador.siguiente.siguiente.token.type == "keyword") {
              this.acepte = false;
              this.informacion =
                "Después de un Keyword no puede haber un Keyword";
              break;
            }
          }
        }

        if (iterador.token.value == "(") {
          if (iterador.siguiente.token.type == "espacio") {
            if (iterador.siguiente.siguiente.token.value == ")") {
              this.acepte = false;
              this.informacion =
                "Dentro de un parentesis debe existir una expresión.";
              break;
            }
          }
        }

        if (iterador.token.value == "(") {
          if (iterador.siguiente.token.value == ")") {
            this.acepte = false;
            this.informacion =
              "Dentro de un parentesis debe existir una expresión.";
            break;
          }
        }

        if (iterador.token.value == "{") {
          if (iterador.siguiente.token.type == "espacio") {
            if (iterador.siguiente.siguiente.token.value == "}") {
              this.acepte = false;
              this.informacion = "Dentro de un {} debe existir una expresión.";
              break;
            }
          }
        }

        if (iterador.token.value == "{") {
          if (iterador.siguiente.token.value == "}") {
            this.acepte = false;
            this.informacion = "Dentro de un {} debe existir una expresión.";
            break;
          }
        }

        if (iterador.token.type == "keyword") {
          if (iterador.siguiente.token.type == "keyword") {
            this.acepte = false;
            this.informacion =
              "Después de un Keyword no puede haber un Keyword";
            break;
          }
        }
        

        iterador = iterador.siguiente;
      }

      console.log(this.openRespuesta);

      this.openRespuesta = !this.openRespuesta;

      console.log(iterador.token.value + " " + iterador.token.type);
      console.log(ultimo.token.value + " " + ultimo.token.type);
    },
  },
  mounted() {
    this.lista = listasLigadas;
  },
};
</script>
<style scoped>
* {
  font-family: "Ubuntu", sans-serif;
}

.todo {
  align-items: center;
  padding: 10% 30%;
  background: linear-gradient(to top, gray, rgb(190, 190, 190));
}
.cajas {
  align-items: center;
  padding: 2% 20%;
}
.titulo {
  color: white;
  text-align: center;
}
.texto {
  border-radius: 8px;
  margin-top: 30px;
}
.textarea {
  display: flex;
  justify-content: space-around;
}
.cajaTexto {
  border-radius: 5px;
  border: 0px;
  display: flex;
  justify-content: space-around;
  height: 20px;
}
.boton {
  display: flex;
  justify-content: space-around;
  height: 30px;
}

.botones {
  border-radius: 10px;
  height: 40px;
}

.inputs {
  display: flex;
  justify-content: space-around;
}
.creditos {
  color: white;
  text-align: center;
}
.titulos {
  display: flex;
  justify-content: space-around;
}
</style>
