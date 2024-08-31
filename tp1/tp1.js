//narvaez julieta
//tp 1
//video: https://youtu.be/S4s42SbpbX4
//comision 3


let imagen;
let cant = 10;
let tam;
let activarColoresRandom = false;

function preload() {
  imagen = loadImage("data/blancoynegro.jpg");
}

function setup() {
  createCanvas(800, 400);
  tam = width / (2 * cant);
}

function draw() {
  background(255);
  image(imagen, 0, 0, 400, 400);
  dibujarLosCuadradosYCirculos();
}


function dibujarLosCuadradosYCirculos() {
  for (let x = 0; x < cant; x++) {
    for (let y = 0; y < cant; y++) {
      let posX = width / 2 + x * tam;
      let posY = y * tam;

      
      
      if ((x + y) % 2 == 0) {
        fill(255);
      } else {
        fill(0);
      }
      rect(posX, posY, tam, tam);

      
     
      if ((x + y) % 2 == 0) {
        if (!activarColoresRandom) {
          fill(0);
       
      } else {
          fill(random(255), random(255), random(255));
        }
      } else {
        if (!activarColoresRandom) {
          fill(255);
        
      } else {
          fill(random(255), random(255), random(255));
        }
      }
      ellipse(posX + tam / 2, posY + tam / 2, tam * 0.4, tam * 0.4);
      }
    }
  }
  
  function dentroDeLaGrilla(posX, posY) {
  return (posX >= width / 2 && posX <= width / 2 + tam * cant &&
          posY >= 0 && posY <= tam * cant);
}


function mouseMoved() {
  if (dentroDeLaGrilla(mouseX, mouseY)) {
    activarColoresRandom = true;
  } else {
    activarColoresRandom = false;
  }
}

function mouseExited() {
  activarColoresRandom = false;
}
