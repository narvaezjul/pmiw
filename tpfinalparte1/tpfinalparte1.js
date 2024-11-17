//Narvaez Julieta. Camila Herrera
//Comision 3
//Pelicula ENREDADOS
//Link video: https://youtu.be/TdvtZwAfNJg


let estado;
let textos = [];
let botones = [];
let imagenes = [];
let pantalla = 0;
let sonido;
let sonidoIniciado = false;

function preload() {

  imagenes[0] = loadImage('data/imagenes/imagen_01.jpg', img => console.log("Imagen 1 cargada"), err => console.log("Error cargando imagen 1"));
  imagenes[1] = loadImage('data/imagenes/imagen_02.jpg', img => console.log("Imagen 2 cargada"), err => console.log("Error cargando imagen 2"));
  imagenes[2] = loadImage('data/imagenes/imagen_03.jpg', img => console.log("Imagen 3 cargada"), err => console.log("Error cargando imagen 3"));
  imagenes[3] = loadImage('data/imagenes/imagen_05.jpg', img => console.log("Imagen 5 cargada"), err => console.log("Error cargando imagen 5"));
  imagenes[4] = loadImage('data/imagenes/imagen_04.jpg', img => console.log("Imagen 4 cargada"), err => console.log("Error cargando imagen 4"));
  imagenes[5] = loadImage('data/imagenes/imagen_10.jpg', img => console.log("Imagen 10 cargada"), err => console.log("Error cargando imagen 10"));
  imagenes[6] = loadImage('data/imagenes/imagen_06.jpg', img => console.log("Imagen 6 cargada"), err => console.log("Error cargando imagen 6"));
  imagenes[7] = loadImage('data/imagenes/imagen_09.jpg', img => console.log("Imagen 9 cargada"), err => console.log("Error cargando imagen 9"));
  imagenes[8] = loadImage('data/imagenes/imagen_07.jpg', img => console.log("Imagen 7 cargada"), err => console.log("Error cargando imagen 7"));
  imagenes[9] = loadImage('data/imagenes/imagen_08.jpg', img => console.log("Imagen 8 cargada"), err => console.log("Error cargando imagen 8"));
  imagenes[10] = loadImage('data/imagenes/imagen_11.jpg', img => console.log("Imagen 11 cargada"), err => console.log("Error cargando imagen 11"));
  imagenes[11] = loadImage('data/imagenes/imagen_13.jpg', img => console.log("Imagen 13 cargada"), err => console.log("Error cargando imagen 13"));
  imagenes[12] = loadImage('data/imagenes/imagen_14.jpg', img => console.log("Imagen 14 cargada"), err => console.log("Error cargando imagen 14"));
  imagenes[100] = loadImage('data/imagenes/imagen_12.jpg', img => console.log("Imagen 12 cargada"), err => console.log("Error cargando imagen 12"));
 
  sonido = loadSound("data/sonido/sonidoenredados.mp3");



}
function setup() {
  createCanvas(640, 480);
  inicializar();
  estado = 0;
  

function draw() {
  background(220);
}
  
  
}

function draw() {
  background(255);

 
  if (imagenes[estado]) {
    image(imagenes[estado], 0, 0, width, height);
  } else {
    console.log("No hay imagen cargada para el estado: " + estado);
  }

  console.log("Dibujando en estado: " + estado);

  if (estado === 0) {
    pantallaInicio();
  } else if (estado === 100) {
    pantallaCreditos();
  } else if (textos[estado] && botones[estado]) {
    pantallaHistoria(textos[estado], botones[estado]);
  } else {
    console.log("Error: estado desconocido o sin contenido");
  }
}

function mousePressed() {
  console.log("Mouse pressed en estado: " + estado);

  if (estado === 0) {
    if (colisionBoton(width / 2, height * 0.75, 200, 40)) {
      console.log("Botón COMENZAR presionado!");
      estado = 1; // 
      
      
      if (!sonidoIniciado) {
        sonido.play();
        sonidoIniciado = true; 
      }
      
      
      
    
      
    } else if (colisionBoton(width / 2, height * 0.75 + 60, 200, 40)) {
      console.log("Botón CRÉDITOS presionado!");
      estado = 100; 
    }
  } else if (estado === 100) {
    if (colisionBoton(width / 2, height * 0.75 + 60, 200, 40)) {
      console.log("Botón VOLVER presionado!");
      estado = 0; 
    }
  } else if (textos[estado] && botones[estado]) {
    botones[estado].forEach(boton => {
      if (colisionBoton(boton.x, boton.y, boton.w, boton.h)) {
        console.log("Botón de historia presionado!");
        estado = boton.nextState; 
      }
    });
  }

  console.log("Nuevo estado: " + estado);
  
  
  
  
}

function inicializar() {
  estado = 0;


  textos[1] = "Aqui comienzan los nuevos finales alternativos: Cuando Flynn logra escapar  \n de la prisión y vuelve a la torre\npara tratar de rescatar a Rapunzel. ¿Logra hacerlo?";
  botones[1] = crearBotones([
    { text: "LA SALVA", nextState: 2 },
    { text: "ES HERIDO", nextState: 3 }
  ]);

  textos[2] = "Salva a Rapunzel y en la pelea física \nla madrastra cae de la torre. ¿Rapunzel la revive con sus poderes?";
  botones[2] = crearBotones([
    { text: "LA REVIVE", nextState: 4 },
    { text: "ELIGE NO REVIVIRLA", nextState: 10 }
  ]);

textos[3] = "Entra a la torre y es apuñalado por la madrastra de Rapunzel. ¿Sobrevive?";
  botones[3] = crearBotones([
    { text: "SOBREVIVE", nextState: 6 },
    { text: "NO SOBREVIVE", nextState: 7 }
  ]);


  textos[4] = "La revive pero no la perdona y no la vuelve a ver más...";
  botones[4] = crearBotones([
{ text: "Siguiente", nextState: 100 }]);

   textos[5] = "Nunca logra encontrarse con sus verdaderos padres";
  botones[5] = crearBotones([{ text: "Siguiente", nextState: 100 }]);

  textos[6] = "Rescata a Rapunzel y toma como prisionera a la madrastra. ¿Es juzgada?";
  botones[6] = crearBotones([
    { text: "SI, ES JUZGADA", nextState: 8 },
    { text: "NO, PORQUE...", nextState: 12 }
  ]);
 
   textos[7] = "Rapunzel vive encerrada por el resto de su vida.";
  botones[7] = crearBotones([{ text: "Siguiente", nextState: 5 }]);


  textos[8] = "La madrastra es juzgada y encerrada en el calabozo mientras \nque Rapunzel mantiene su cabello largo y magico, \ny es feliz en el pueblo.";
  botones[8] = crearBotones([{ text: "Siguiente", nextState: 11 }]);
 

  textos[9] = "Logra perdonarla y la va a visitar a la torre todos los años";
  botones[9] = crearBotones([{ text: "Siguiente", nextState: 100 }]);


  textos[10] = "VUELVEN AL REINO CON LOS VERDADEROS PADRES Y VIVEN FELICES.";
  botones[10] = crearBotones([{ text: "Siguiente", nextState: 100 }]);
 
  textos[11] = "Y se dedica a curar a la gente del pueblo con \nlos poderes de su cabello.";
  botones[11] = crearBotones([{ text: "VOLVER", nextState: 100 }]);

  textos[12] = "La madrastra pide perdon y muestra arrepentimiento. \nRapunzel lograra perdonarla?";
  botones[12] = crearBotones([{ text: "SIguiente", nextState: 9 }]);

 
}

function crearBotones(opciones) {
  return opciones.map((opcion, index) => ({
    ...opcion,
    x: width / 2,
    y: height * 0.75 + index * 60,
    w: 200,
    h: 40
  }));
}

function dibujaBoton(txt, x, y, w, h) {
  push();
  rectMode(CENTER);
  fill(colisionBoton(x, y, w, h) ? color(20, 200, 0) : color(100));
  rect(x, y, w, h);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(16);
  text(txt, x, y);
  pop();
}

function colisionBoton(x, y, w, h) {
  return (mouseX > x - w / 2 && mouseX < x + w / 2 && mouseY > y - h / 2 && mouseY < y + h / 2);
}

function pantallaInicio() {
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("ENREDADOS\nHola!\n¿Estás preparado\npara darle comienzo a esta historia?", width / 2, height / 2);
  dibujaBoton("COMENZAR", width / 2, height * 0.75, 200, 40);
  dibujaBoton("CRÉDITOS", width / 2, height * 0.75 + 60, 200, 40);
}

function pantallaCreditos() {
  fill(0,255,0);
  textAlign(CENTER);
  textSize(24);
  text("FIN\nJulieta Narvaez Camila Herrera\nTrabajo Práctico final Parte 1\nPelícula: Enredados", width / 2, height / 2);
  dibujaBoton("VOLVER", width / 2, height * 0.75 + 60, 200, 40);
}

function pantallaHistoria(texto, botones) {
  fill(255, 0, 255);
  textAlign(LEFT);
  textSize(18);
  text(texto, 10, 40);

 
  botones.forEach(boton => {
    dibujaBoton(boton.text, boton.x, boton.y, boton.w, boton.h);
  });
}
