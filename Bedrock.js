class Bedrock extends Box{
    constructor(x, y, w, h){
        let basicBird = []; //llista de sprites del ocell bàsic

        basicBird.push(loadImage('assets/BedrockBox.png'));

        super(x, y, w, h, -1, 0.5, 0.5, basicBird, box2d.b2BodyType.b2_staticBody);
    }
}