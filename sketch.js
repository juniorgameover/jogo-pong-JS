//variáveis da bolinha
let xBolinha = 300;
let yBolinha= 200;
let dBolinha = 15;
let raio = dBolinha /2;
let colidiu = false;

//variaveis da raquete
let xDaRaquete = 5;
let yDaRaquete = 150;
let larguraRaquete = 10;
let alturaRaquete = 90;

//variáveis raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//velocidade da bolinha
let velocidadeXbolinha = 6;
let velocidadeYBolinha = 6;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo

let raquetada;
let ponto;
let trilha;

/*function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}
*/

function setup() {
  createCanvas(600, 400);
  //trilha.loop();
  
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha()
  verificaColisaoBorda();
  mostraRaquete(xDaRaquete,yDaRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaMinhaRaquete();
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xDaRaquete,yDaRaquete);
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  
}


function mostraBolinha(){
    circle(xBolinha,yBolinha,dBolinha);
}

function movimentaBolinha(){
  xBolinha += velocidadeXbolinha;
  yBolinha += velocidadeYBolinha;
  
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width || (xBolinha - raio) < 0 ) {
   velocidadeXbolinha *= -1;
  }
  if (yBolinha + raio > height || (yBolinha - raio) < 0){
    velocidadeYBolinha *=-1;
  }
}

function mostraRaquete(x,y){
  rect(x,y,larguraRaquete,alturaRaquete);
}


function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yDaRaquete -=10;
  }
  
   if(keyIsDown(DOWN_ARROW)){
    yDaRaquete +=10;
  }
  
}

/*function verificaColisaoRaquete(){
  if (xBolinha - raio < xDaRaquete + larguraRaquete && yBolinha - raio < yDaRaquete + alturaRaquete && yBolinha + raio > yDaRaquete){
    velocidadeXbolinha *= -1;
     
  }
}
*/

function verificaColisaoRaquete(x,y){
  colidiu = collideRectCircle(x,y,larguraRaquete,alturaRaquete,xBolinha,yBolinha,raio);
  if(colidiu){
     velocidadeXbolinha *= -1;
    //raquetada.play();
}
  }
  




function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente-alturaRaquete/2-10;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChancedeErrar();
}

function incluiPlacar(){
  stroke(255)
  fill(color(255,140,0));
  rect(130,10,40,20)
  rect(430,10,40,20)
  textAlign(CENTER);
  textSize(16);  
  fill(255);
  text(meusPontos, 150, 26)
  text(pontosOponente, 450,26)
}



function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    //ponto.play();
  }
  
  if(xBolinha < 10){
    pontosOponente +=1;
    //ponto.play();
  }
}

function calculaChancedeErrar(){
  if(pontosOponente >= meusPontos){
    chanceDeErrar +=1;
    if(chanceDeErrar >= 39){
      chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35) {
      chanceDeErrar = 35;
    }
  }
}
