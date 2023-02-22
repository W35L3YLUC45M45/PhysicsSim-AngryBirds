class Level {
    constructor(JSONData){
        this.JSONData = JSONData; //quan es fa la lectura del json es guarda aqui per a ser processada en el setup

        this.boxes = []; //tots els cubs del nivell (movibles)
        this.boundaries = []; //tots els bordes del nivell (estàtic)
        this.birds = []; //llista dels ocells que estan actius (maybe s'haurà de modificar per a posar altres ocells)
        this.pigs = []; //llista de porcs que hi ha per nivell
        this.surface; //xd no s'utilitza
        this.floorPosition = 700; //xd per 2

        this.birdsThrown; //número d'ocells tirats
        this.pigNumber; //número de porcs vius

        this.bkgSky = loadImage('assets/sky.png'); //el fons (cel)
        this.bkgFloor = loadImage('assets/floor.png'); //el fons (terra)
        this.bach = loadImage("assets/back-arrow.png");//back arrow
        this.box = loadImage("assets/WoodBox.png");//wood box to put pajarus 

        this.normalBird = loadImage("assets/BasicBird.png");
        this.bigBird = loadImage("assets/BigBird.png");
        this.yellowBird = loadImage("assets/FastBird.png");
        this.blueBird = loadImage("assets/Tribird.png");
        this.randomBird = loadImage("assets/RandomBird.png");
        this.bombBird = loadImage("assets/BombBird.png");

        this.sling_back = loadImage("assets/slingshotBack.png");
        this.sling_front = loadImage("assets/slingshotFront.png");

        this.win_screen = loadImage('assets/win-screen.png');
        this.lose_screen = loadImage('assets/lose-screen.png');;

        this.playState; //0:playing, 1:won, 2:lost
        this.bird; //0:normal, 1:big, 2:yellow, 3:blue, 4:random, 5:bomba

        this.explosionCenter;
        this.exploded;
        this.explosionGif = loadImage('assets/explosion.gif');

        this.points;//contador de punts. Arriba a 0: lost. Kill cerditos: win. A ver quina puntuació s'aconsegueix
    }

    setup(){
        //carregar la info de JSONData
        this.JSONData.boxes.forEach((box) => {
            switch(box.type){
                case "fusta":
                    this.boxes.push(new Fusta(box.position[0], box.position[1], box.size[0], box.size[1]));
                    break;
                case "gel":
                    this.boxes.push(new Gel(box.position[0], box.position[1], box.size[0], box.size[1]));
                    break;
                case "metall":
                    this.boxes.push(new Metall(box.position[0], box.position[1], box.size[0], box.size[1]));
                    break;
                case "lava":
                    this.boxes.push(new Lava(box.position[0], box.position[1], box.size[0], box.size[1]));
                    break;
                case "bedrock":
                    this.boxes.push(new Bedrock(box.position[0], box.position[1], box.size[0], box.size[1]));
                    break;
                case "tnt":
                    this.boxes.push(new Tnt(box.position[0], box.position[1], box.size[0], box.size[1]));
                    break;
            }
        });

        this.JSONData.pigs.forEach((pig) => {
            switch(pig.type){
                case "normal":
                    this.pigs.push(new NormalPig(pig.position[0], pig.position[1], pig.radius));
                    break;
                case "hat":
                    this.pigs.push(new HatPig(pig.position[0], pig.position[1], pig.radius));
                    break;
            }
        });

        this.JSONData.boundaries.forEach((bound) => {
            this.boundaries.push(new Boundary(bound.position[0], bound.position[1], bound.size[0], bound.size[1]));
        });

        //inicialització dels estats de l'inici del nivell: ocell, ocells tirats...
        this.playState = 0;
        this.bird = 0;
        this.birdsThrown = 0;
        this.pigNumber = this.pigs.length;
        this.points = 5;
        this.exploded = false;
    }

    draw(){
        //crida a la funció per dibuixar els fons
        this.drawBackground();

        //dibuixa la pantalla depenent de l'estat del joc
        switch(this.playState){
            case 0:
                if(this.points > 1){
                    fill(color(128, 128, 128));
                } else {
                    fill(color(255, 0, 0));
                }
                textSize(64);
                text("Current points: " + this.points, (width/2) - 200, 128);
        
                //es dibuixen les boundaries
                for (let i = 0; i < this.boundaries.length; i++) {
                    this.boundaries[i].display();
                  }
                
                //es dibuixen els cerditos
                for (let i = 0; i < this.pigs.length; i++) {
                    if (this.pigs[i].done()) {
                        this.pigs.splice(i, 1);
                    }else{
                        this.pigs[i].displayAsset();
                    }
                }
                if(this.pigNumber != this.pigs.length){
                    this.points += 3;
                    this.pigNumber = this.pigs.length;
                }
                
                //es dibuixen les caixes
                for (let i = 0; i < this.boxes.length; i++) {
                    if (this.boxes[i].done()) {
                        this.boxes.splice(i, 1);
                    }else{
                        this.boxes[i].displayAsset();
                    }  
                }
        
                //es dibuixen els ocells actius
                for (let i = 0; i < this.birds.length; i++) {
                    if (this.birds[i].done()) {
                        this.birds.splice(i, 1);
                    }else{
                        //birds[i].display();
                        this.birds[i].displayAsset();
                    }
                }
                break;
            case 1:
                //cas en el que es guanyi
                textSize(100);
                fill(color(255, 255, 255));
                image(this.win_screen, 446, 235);
                text("Total points: " + this.points, 525, (height/2 + 175));
                break;
            case 2:
                //cas en el que es perdi
                textSize(128);
                image(this.lose_screen, 446, 235);
                break;
        }

        //gestiona l'estat de la partida, és a dir, si queden porcs vius o bé si t'has quedat sense punts
        if(this.pigNumber < 1){
            this.playState = 1;
        } else if (this.points < 1) {
            setTimeout(() => {
                if (this.points < 1) {
                    this.playState = 2;
                }
            }, 5000);
        }
    }

    //funció per a dibuixar els fons. Més endavan es podran dibuixar atres coses. Maybe. Com la fletxa o el slingshot
    drawBackground(){
        //es dibuixen el fons, el tirachinas i la fletxa enrere
        image(this.bkgSky,0,0);
        image(this.bkgFloor,0,0); 
        image(this.bach, 0, 0, 150, 150);
        image(this.sling_back, 200, 465);
        image(this.sling_front, 172, 463);
        //primer es dibuixa un rectangle que es col·locarà en la posició de l'ocell que està seleccionat
        fill(color(255, 255, 255, 128));
        rectMode(CORNERS);
        rect(30 +(140+35)*this.bird, height-145, 30 + 140+(140+35)*this.bird, height - 5);
        //després es dibuixaran les caselles amb cada un dels ocells seleccionables
        image(this.box, 25, height-150, 150, 150);
        image(this.normalBird, 55, height-120, 90, 90);
        image(this.box, 200, height-150, 150, 150);
        image(this.bigBird, 230, height-120, 90, 90);
        image(this.box, 375, height-150, 150, 150);
        image(this.yellowBird, 405, height-120, 90, 90);
        image(this.box, 550, height-150, 150, 150);
        image(this.blueBird, 580, height-120, 90, 90);
        image(this.box, 725, height-150, 150, 150);
        image(this.randomBird, 755, height-120, 90, 90);
        image(this.box, 900, height-150, 150, 150);
        image(this.bombBird, 930, height-120, 90, 90);

        let scale = 200;
        if(this.exploded) image(this.explosionGif, this.explosionCenter.x -scale, this.explosionCenter.y -scale, scale*2, scale*2);
    }

    //funció per a crear un ocell en el slingshot. S'ha de fer un overhaul si es vol que els ocells surtin en un ordre determinat
    createBird(direction){
        if(this.points > 0){
            let b;
            //aquest switch crea un ocell depenent de l'ocell seleccionat
            switch (this.bird) {
                case 0:
                    b = new NormalBird(mouseX, mouseY);
                    break;
                case 1:
                    b = new BigBird(mouseX, mouseY);
                    break;
                case 2:
                    b = new YellowBird(mouseX, mouseY);
                    break;
                case 3:
                    b = new BlueBird(mouseX, mouseY);
                    break;
                case 4:
                    b = new RandomBird(mouseX, mouseY);
                    break;
                case 5:
                    b = new BombBird(mouseX, mouseY);
                    break;
            }
            b.setVelocity(direction.mult(-1));
            this.birds.push(b);
            this.points--;
        }
    }

    //funció per activar l'habilitat de l'ocell. Controla tant que l'ocell estigui viu com que la habilitat no s'hagi utilitzat
    birdAbility(){
        this.birds.forEach((bird)=>{
            if(!bird.done() && !bird.abilityUsed){ 
                bird.birdAbility();
                bird.abilityUsed = true;
            }
        });
    }

    explosion(center, blastRadius){
        let blastPower = 30;

        this.explosionCenter = scaleToPixels(center);
        this.exploded = true;
        //this.explosionGif.play();
        setTimeout(() => {
            this.exploded = false;
            //this.explosionGif.pause();
        }, 500);

        let bodyPos;
        this.birds.forEach(bird => {
            bodyPos = bird.body.GetPosition();

            let distance = abs(this.vecMagnitude(center) - this.vecMagnitude(bodyPos))

            if (distance <= blastRadius){
                bird.applyBlastImpulse(center, bird.body.GetPosition(), blastPower);
            }
        });

        this.boxes.forEach(box => {
            bodyPos = box.body.GetPosition();

            let distance = abs(this.vecMagnitude(center) - this.vecMagnitude(bodyPos))
            console.log(distance);
            if (distance <= blastRadius){
                box.applyBlastImpulse(center, box.body.GetPosition(), blastPower);
                box.damage();
            }
        });

        this.pigs.forEach(pig => {
            bodyPos = pig.body.GetPosition();

            let distance = abs(this.vecMagnitude(center) - this.vecMagnitude(bodyPos))

            if (distance <= blastRadius){
                pig.applyBlastImpulse(center, pig.body.GetPosition(), blastPower);
                pig.damage();
            }
        });
    }

    vecMagnitude(v) {
        return sqrt(pow(v.x, 2) + pow(v.y, 2));
    }

    resetLevel(){
        //primer s'eliminen tots els objectes residuals de l'escena anterior
        this.boxes.forEach((box) => box.destroyNow());
        this.boundaries.forEach((boundary) => boundary.destroyNow());
        this.birds.forEach((bird) => bird.destroyNow());
        this.pigs.forEach((pig) => pig.destroyNow());

        //es reinicialitzen els arrays (per a evitar possibles grups)
        this.boxes = []; 
        this.boundaries = []; 
        this.birds = []; 
        this.pigs = []; 
    }
}