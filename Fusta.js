class Fusta extends Box{
    constructor(x, y, w, h){
        let basicBird = []; //llista de sprites del ocell bàsic

        basicBird.push(loadImage('assets/WoodBox4.png'));
        basicBird.push(loadImage('assets/WoodBox.png'));

        super(x, y, w, h, 2, 1.5, 1, basicBird, box2d.b2BodyType.b2_dynamicBody);
    }
}