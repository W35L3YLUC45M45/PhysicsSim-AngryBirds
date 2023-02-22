class YellowBird extends Bird{
    constructor(x, y){
        let basicBird = []; //llista de sprites del ocell bàsic
        let radius = 45;

        basicBird.push(loadImage('assets/FastBird.png'));
        basicBird.push(loadImage('assets/FastBirdCollided2.png'));
        basicBird.push(loadImage('assets/BasicBirdDisappear.png'));

        super(x, y, radius, basicBird);

        this.birdAbility = () => {
            let scale = 7;
            let x = this.body.GetLinearVelocity().x * scale;
            let y = this.body.GetLinearVelocity().y * scale;
            console.log(this.body.GetLinearVelocity());
            this.body.SetLinearVelocity(new box2d.b2Vec2(x,y));
            console.log(this.body.GetLinearVelocity());
        }
    }
}