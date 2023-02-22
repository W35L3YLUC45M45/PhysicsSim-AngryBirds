const MENU = 0;
const LEVELSELECT = 1;
const LEVEL1 = 2;
const LEVEL2 = 3;
const LEVEL3 = 4;

let world; //Box2D world, variable global que controla el que passa en el món
let width = 1750; //amplada del canvas 
let height = 900; //altura del canvas
let fontAB; //font del text del joc
let drip; //música de fons del joc
let vine_boom; //so de presionar el ratolí
let scream; //grit dels ocells al esser llençats

let currentStatus = MENU; //estatus inicial

let menu; //classe menu, conté tot el relacionat amb ella
let level; //nivell del joc, conté tot el relacionat amb ell
//informació que es llegeix dels JSONS
let level1;
let level2;
let level3;

let origin; //se situa on fas clic amb el ratolí per primera vegada. Utilitzat per a disparar ocells
let direction; //marca la direcció amb la que s'han de disparar els ocells

//la funció preload s'executa abans que res del programa, i s'utilitza generalment per a fer la crida d'assets
function preload(){
  loadAssets(); //funció de càrrega d'assets
}

function setup() {
  createCanvas(width, height);
  //setup del world del box2D. Si no hi ha problemes no s'haurien de tocar
  world = createWorld(new box2d.b2Vec2(0, 0));
  world.SetContactListener(new CustomListener());  
  
  textFont(fontAB);
  
  drip.play();
  
  console.log("setup");
}

function loadAssets(){
  menu = new Menu();

  level1 = loadJSON("level1.json");
  level2 = loadJSON("level2.json");
  level3 = loadJSON("level3.json");

  fontAB = loadFont('assets/angrybirds-regular.ttf');

  drip = loadSound('assets/bad-piggies-drip.mp3');

  soundFormats('mp3', 'ogg');
  vine_boom = loadSound('assets/vine-boom');
  scream = loadSound('assets/kirby-falling-meme');
}


function draw() {
  //marca cada quan s'actualitza el mon físic (cada quan el box2D gestiona les colisions)
  let timeStep = 1.0 / 30;
  world.Step(timeStep, 50, 50);

  //depèn de l'estat del joc es dibuixarà una cosa o una altra
  switch (currentStatus) {
    case MENU:
      menu.drawMenu();
      break;
    case LEVELSELECT:
      menu.drawLevels();
      break;
    case LEVEL1:
    case LEVEL2:
    case LEVEL3:
      level.draw(); //dibuixa el nivell. that's it
      break;
    default:
      console.log("You got absolutely jabaited");
      break;
  }

  //literalment la funció mousepressed del billar. Dibuixa una línia vermella des d'on havies clicat fins on tens el ratolí
  if (mouseIsPressed && (currentStatus == LEVEL1 || currentStatus == LEVEL2 || currentStatus == LEVEL3)) {
    let mouse = createVector(mouseX, mouseY); 
    direction = mouse.sub(origin);
    mag = mouse.mag();
    push()
      translate(origin);
      strokeWeight(2);
      stroke(255,0,2)
      line(0, 0, mouse.x, mouse.y);
    pop()
  }


}

function mousePressed() {
  origin = createVector(mouseX, mouseY);

  switch (currentStatus) {
    case MENU:
      if(mouseX > 7*width/16 && mouseX < 9.2*width/16 && mouseY > 5*height/8 && mouseY < 6.2*height/8){
        currentStatus = LEVELSELECT;
        vine_boom.play();
        if (vine_boom.isPlaying()) {
          vine_boom.stop();
          vine_boom.play();
        }
      }
      break;
    case LEVELSELECT:
      if(mouseX >  width/7 && mouseX < 2*width/7 && mouseY > height/3 && mouseY < 2*height/3){
        if(level != undefined) level.resetLevel();
        //fer les lectures del JSON
        level = new Level(level1); //inicialització del nivell. es llegeix i es guarda el JSON, es carreguen els assets and whatnot
        level.setup();
        currentStatus = LEVEL1;
        vine_boom.play();
        if (vine_boom.isPlaying()) {
          vine_boom.stop();
          vine_boom.play();
        }
      }
      if(mouseX >  3*width/7 && mouseX < 4*width/7 && mouseY > height/3 && mouseY < 2*height/3){
        if(level != undefined) level.resetLevel();
        level = new Level(level2); //inicialització del nivell. es llegeix i es guarda el JSON, es carreguen els assets and whatnot
        level.setup();
        currentStatus = LEVEL2;
        vine_boom.play();
        if (vine_boom.isPlaying()) {
          vine_boom.stop();
          vine_boom.play();
        }
      }
      if(mouseX >  5*width/7 && mouseX < 6*width/7 && mouseY > height/3 && mouseY < 2*height/3){
        if(level != undefined) level.resetLevel();
        level = new Level(level3); //inicialització del nivell. es llegeix i es guarda el JSON, es carreguen els assets and whatnot
        level.setup();
        currentStatus = LEVEL3;
        vine_boom.play();
        if (vine_boom.isPlaying()) {
          vine_boom.stop();
          vine_boom.play();
        }
      }
      //debugger;
      break;
    case LEVEL1:
    case LEVEL2:
    case LEVEL3:
      //això correspon a la fletxa de tirar enrere
      if(mouseX < 150 && mouseY < 150){
        currentStatus = MENU;
        //això correspon a cada una de les caselles dels ocells, per a poder escollir
      } else if(mouseX >  25 && mouseX < 175 && mouseY > height-150){
        level.bird = 0;
      } else if(mouseX >  200 && mouseX < 350 && mouseY > height-150){
        level.bird = 1;
      } else if(mouseX >  375 && mouseX < 525 && mouseY > height-150){
        level.bird = 2;
      } else if(mouseX >  550 && mouseX < 700 && mouseY > height-150){
        level.bird = 3;
      } else if(mouseX >  725 && mouseX < 875 && mouseY > height-150){
        level.bird = 4;
      } else if(mouseX >  900 && mouseX < 1050 && mouseY > height-150){
        level.bird = 5;
      //si no hi ha res, es fa l'abilitat de l'ocell
      } else {
        level.birdAbility();
      }
      break;
    default:
      //console.log("You got absolutely jabaited");
      break;
  }
}

function mouseReleased(){
  //això tampoc entraria aquí, but shit happens
  switch(currentStatus){
    case LEVEL1:
    case LEVEL2:
    case LEVEL3:
      if(origin.x >  172 && origin.x < 250 && origin.y > 465 && origin.y < 675 && mouseY < 675){
        level.createBird(direction);
        scream.play();
        if (scream.isPlaying()) {
          scream.stop();
          scream.play();
        }
      }
      break;
    default:
      //console.log("You got absolutely jabaited");
      break;
  } 
}