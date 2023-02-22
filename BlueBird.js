class BlueBird extends Bird{
    constructor(x, y){
        let basicBird = []; //llista de sprites del ocell bàsic
        let radius = 35;

        basicBird.push(loadImage('assets/Tribird.png'));
        basicBird.push(loadImage('assets/TribirdCollided2.png'));
        basicBird.push(loadImage('assets/BasicBirdDisappear.png'));

        super(x, y, radius, basicBird);

        this.birdAbility = () => {
            let pos = scaleToPixels(this.body.GetPosition());
            let x = this.body.GetLinearVelocity().x;
            let y = this.body.GetLinearVelocity().y + 5;
            let b = new BlueBird(pos.x, pos.y);
            b.setVelocity(createVector(x, y));
            b.abilityUsed = true;
            level.birds.push(b);

            pos = scaleToPixels(this.body.GetPosition());
            x = this.body.GetLinearVelocity().x;
            y = this.body.GetLinearVelocity().y - 5;
            b = new BlueBird(pos.x, pos.y);
            b.setVelocity(createVector(x, y));
            b.abilityUsed = true;
            level.birds.push(b);
        }
    }
}