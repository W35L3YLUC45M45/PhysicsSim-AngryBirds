class BigBird extends Bird{
    constructor(x, y){
        let basicBird = []; //llista de sprites del ocell bic
        let radius = 90;

        basicBird.push(loadImage('assets/BigBird.png'));
        basicBird.push(loadImage('assets/BigBirdCumming.png'));
        basicBird.push(loadImage('assets/BasicBirdDisappear.png'));

        super(x, y, radius, basicBird);
    }
}