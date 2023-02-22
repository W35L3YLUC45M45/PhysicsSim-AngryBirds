class HatPig extends Pig{
    constructor(x, y, r){
        let basicPig = []; //llista de sprites del pork

        basicPig.push(loadImage('assets/BasicPigMedium.png'));
        basicPig.push(loadImage('assets/BasicPigMediumDead.png'));
        basicPig.push(loadImage('assets/BasicPigMediumDisapear.png'));
        basicPig.push(loadImage('assets/ArmoredPig.png'));

        super(x, y, r, 2, basicPig);
    }
}