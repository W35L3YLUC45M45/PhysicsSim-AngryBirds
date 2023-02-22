class RandomBird extends Bird{
    constructor(x, y){
        let basicBird = []; //llista de sprites del ocell bàsic
        let radius = 45;

        basicBird.push(loadImage('assets/RandomBird.png'));
        basicBird.push(loadImage('assets/RandomBird.png'));
        basicBird.push(loadImage('assets/BasicBirdDisappear.png'));

        super(x, y, radius, basicBird);

        this.birdAbility = () => {
            let rand = round(random(0, 3));
            console.log(rand);
            //0:res, 1:yellow, 2:blau, 3:bomba 
            let x;
            let y;
            switch(rand){
                case 0:
                    break;
                case 1:
                    let scale = 7;
                    x = this.body.GetLinearVelocity().x * scale;
                    y = this.body.GetLinearVelocity().y * scale;
                    console.log(this.body.GetLinearVelocity());
                    this.body.SetLinearVelocity(new box2d.b2Vec2(x,y));
                    console.log(this.body.GetLinearVelocity());
                    break;
                case 2:
                    let pos = scaleToPixels(this.body.GetPosition());
                    x = this.body.GetLinearVelocity().x;
                    y = this.body.GetLinearVelocity().y + 5;
                    let b = new RandomBird(pos.x, pos.y);
                    b.setVelocity(createVector(x, y));
                    b.abilityUsed = true;
                    level.birds.push(b);

                    pos = scaleToPixels(this.body.GetPosition());
                    x = this.body.GetLinearVelocity().x;
                    y = this.body.GetLinearVelocity().y - 5;
                    b = new RandomBird(pos.x, pos.y);
                    b.setVelocity(createVector(x, y));
                    b.abilityUsed = true;
                    level.birds.push(b);
                    break;
                case 3:
                    level.explosion(this.body.GetPosition(), 20);
                    this.toDestroy();
                    break;
            }
        }
    }
}