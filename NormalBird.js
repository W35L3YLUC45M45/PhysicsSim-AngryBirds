class NormalBird extends Bird{
    constructor(x, y){
        let basicBird = []; //llista de sprites del ocell bàsic
        let radius = 45;

        basicBird.push(loadImage('assets/BasicBird.png'));
        basicBird.push(loadImage('assets/BasicBirdCollided.png'));
        basicBird.push(loadImage('assets/BasicBirdDisappear.png'));

        super(x, y, radius, basicBird);
    }
}