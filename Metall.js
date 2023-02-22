class Metall extends Box{
    constructor(x, y, w, h){
        let basicBird = []; //llista de sprites del ocell bàsic

        basicBird.push(loadImage('assets/IronBox4.png'));
        basicBird.push(loadImage('assets/IronBox3.png'));
        basicBird.push(loadImage('assets/IronBox.png'));

        super(x, y, w, h, 3, 2, 2, basicBird, box2d.b2BodyType.b2_dynamicBody);
    }
}