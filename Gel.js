class Gel extends Box{
    constructor(x, y, w, h){
        let basicBird = []; //llista de sprites del ocell bàsic

        basicBird.push(loadImage('assets/IceBox4.png'));
        basicBird.push(loadImage('assets/IceBox.png'));

        super(x, y, w, h, 2, 0.2, 1, basicBird, box2d.b2BodyType.b2_dynamicBody);
    }
}