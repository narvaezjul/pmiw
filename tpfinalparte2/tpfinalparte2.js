//Narvaez Julieta
//Camila Herrera 
//Tp Final parte 2
//Comision 3
//Link youtube: https://youtu.be/kqtNgAW8rRo



let imagenFondo, imagenCamaleon, imagenInsectos;
let insectos = [];
let camaleon;
let velocidadInsectos = [1, 1.5, 2, 2.5, 3, 3.5, 4];
let sonido;

function preload() {
  imagenFondo = loadImage('data/imagenes/fondo.png');
  imagenCamaleon = loadImage('data/imagenes/camaleon.png');
  imagenInsectos = loadImage('data/imagenes/insectos.png');
  sonido = loadSound('data/sonido/musicajuego.mp3');
}

function setup() {
  createCanvas(500, 500);
  pantalla = new Pantalla();
}

function draw() {
  pantalla.dibujar();
  pantalla.actualizar();
}

function keyPressed() {
  if (pantalla.estado === "perder" || pantalla.estado === "ganar") {
    pantalla.reiniciar();
  }
}

class Pantalla {
  constructor() {
    this.juego = new Juego();
    this.boton = new Boton(250, 250, 100, 50);
    this.botonReinicio = new Boton(250, 450, 100, 50);
    this.estado = "inicio";
  }

  dibujar() {
    if (this.estado === "inicio") {
      background(imagenFondo);
      
       fill(255);
      textSize(20);
      textAlign(CENTER, CENTER);
      text("Enredados: El Juego", width / 2, 150);
      text("Desplazate hacia los costados con las letras A y D \n Si no logras agarrar los insectos perderas vidas ", width / 2, 200);
       
     
       this.boton.dibujar("Iniciar");
      if (this.boton.presionar()) {
        this.estado = "juego";
        if (sonido.isLoaded()) {
          sonido.play();
        }
      }
    }

    if (this.estado === "juego") {
      this.juego.actualizar();
    }

    if (this.estado === "perder") {
      background(255, 0, 0);
      fill(255);
      textSize(32);
      textAlign(CENTER, CENTER);
      text("Perdiste", width / 2, height / 2);
      
      textSize(12);
      text("Narvaez Julieta Camila Herrera", width / 2, height / 2 +80);

    
      this.botonReinicio.dibujar("Reiniciar");
      if (this.botonReinicio.presionar()) {
        this.estado = "inicio";
        this.juego.reiniciar();
      }
    }

    if (this.estado === "ganar") {
      background(0, 255, 0);
      fill(0);
      textSize(32);
      textAlign(CENTER, CENTER);
      text("¡Ganaste!", width / 2, height / 2);
      
       textSize(12);
      text("Narvaez Julieta Camila Herrera", width / 2, height / 2 +80);
      
      this.botonReinicio.dibujar("Reiniciar");
      if (this.botonReinicio.presionar()) {
        this.estado = "inicio";
        this.juego.reiniciar();
      }
    }
  }

  actualizar() {
    if (this.estado === "juego") {
      this.juego.actualizar();
      if (this.juego.ganaste()) {
        this.estado = "ganar";
      }
      if (this.juego.perdiste()) {
        this.estado = "perder";
      }
    }
  }

  reiniciar() {
    this.juego.reiniciar();
    this.estado = "juego";
  }
}

class Juego {
  constructor() {
    this.camaleon = new Camaleon(width / 2, height - 30, 140);
    this.insectos = [];
    this.puntos = 0;
    this.vidas = 3;
    this.cantidadInsectos = 7;
    for (let i = 0; i < this.cantidadInsectos; i++) {
      let x = random(50, width - 50);
      let y = random(-100, -400);
      let velocidad = random(1, 3);
      this.insectos.push(new Insecto(x, y, 40, velocidad));
    }
  }

  actualizar() {
    background(imagenFondo);
    for (let i = 0; i < this.cantidadInsectos; i++) {
      let insecto = this.insectos[i];
      insecto.mover();
      insecto.dibujar();

      if (this.camaleon.colisionConInsecto(insecto)) {
        if (!insecto.eliminado) {
          insecto.eliminar();
          this.puntos++;
        }
      }

      if (insecto.cayo()) {
        this.vidas--; 
      }
    }

    this.camaleon.mover();
    this.camaleon.dibujar();
    this.mostrarPuntos();
    this.mostrarVidas();

    if (this.ganaste()) {
      pantalla.estado = "ganar";
    }
    if (this.perdiste()) {
      pantalla.estado = "perder";
    }
  }

  reiniciar() {
    this.puntos = 0;
    this.vidas = 3;
    for (let i = 0; i < this.cantidadInsectos; i++) {
      let x = random(50, width - 50);
      let y = random(-100, -400);
      let velocidad = random(1, 3);
      this.insectos[i].reiniciar(x, y, 40, velocidad);
    }
  }

  mostrarPuntos() {
    fill(255);
    textSize(18);
    text("Insectos: " + this.puntos, 20, 30);
  }

  mostrarVidas() {
    fill(255, 0, 0);
    textSize(20);
    text("Vidas: " + this.vidas, width - 100, 30);
  }

  ganaste() {
    return this.puntos >= 10;
  }

  perdiste() {
    return this.vidas <= 0;
  }
}

class Camaleon {
  constructor(x, y, tam) {
    this.x = x;
    this.y = y;
    this.tam = tam;
  }

  mover() {
    if (keyIsDown(65)) {
      this.x = max(this.x - 5, 0);
    }
    if (keyIsDown(68)) {
      this.x = min(this.x + 5, width);
    }
  }

  dibujar() {
    image(imagenCamaleon, this.x - this.tam / 2, this.y - this.tam / 2, this.tam, this.tam);
  }

  colisionConInsecto(insecto) {
    let d = dist(this.x, this.y, insecto.x, insecto.y);
    return d < this.tam / 2 + insecto.tam / 2;
  }
}

class Insecto {
  constructor(x, y, tam, velocidad) {
    this.x = x;
    this.y = y;
    this.tam = tam;
    this.velocidad = velocidad;
    this.eliminado = false;
    this.cayoSinSerAtrapado = false;
  }

  mover() {
    this.y += this.velocidad;
    if (this.y > height) {
      if (!this.eliminado) {
        this.cayoSinSerAtrapado = true; 
      }
      this.y = random(-100, -400);
      this.x = random(50, width - 50);
      this.eliminado = false;
    }
  }

  dibujar() {
    if (!this.eliminado) {
      image(imagenInsectos, this.x - this.tam / 2, this.y - this.tam / 2, this.tam, this.tam);
    }
  }

  eliminar() {
    this.x = random(50, width - 50);
    this.y = random(-100, -400);
    this.eliminado = true;
    this.cayoSinSerAtrapado = false;
  }

  cayo() {
    if (this.cayoSinSerAtrapado) {
      this.cayoSinSerAtrapado = false;
      return true;
    }
    return false;
  }

  reiniciar(x, y, tam, velocidad) {
    this.x = x;
    this.y = y;
    this.tam = tam;
    this.velocidad = velocidad;
    this.eliminado = false;
    this.cayoSinSerAtrapado = false;
  }
}

class Boton {
  constructor(x_, y_, tamX_, tamY_) {
    this.x = x_;
    this.y = y_;
    this.tamX = tamX_;
    this.tamY = tamY_;
  }

  dibujar(texto) {
    push();
    rectMode(CENTER);
    if (mouseX < this.x + this.tamX / 2 && mouseX > this.x - this.tamX / 2 && mouseY > this.y - this.tamY / 2 && mouseY < this.y + this.tamY / 2) {
      fill(0, 255, 0);
    } else {
      fill(255, 0, 0);
    }
    rect(this.x, this.y, this.tamX, this.tamY);
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(texto, this.x, this.y);
    pop();
  }

  presionar() {
    if (mouseIsPressed && mouseX < this.x + this.tamX / 2 && mouseX > this.x - this.tamX / 2 && mouseY > this.y - this.tamY / 2 && mouseY < this.y + this.tamY / 2) {
      return true;
    }
    return false;
  }
}
