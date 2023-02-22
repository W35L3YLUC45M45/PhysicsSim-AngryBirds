class Tnt extends Box{
    constructor(x, y, w, h){
        let basicBird = []; //llista de sprites del ocell bàsic

        basicBird.push(loadImage('assets/tntBox.png'));

        super(x, y, w, h, 1, 1, 2, basicBird, box2d.b2BodyType.b2_dynamicBody);
    }
}