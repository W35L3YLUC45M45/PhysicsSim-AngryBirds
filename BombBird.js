class BombBird extends Bird{
    constructor(x, y){
        let basicBird = []; //llista de sprites del ocell bàsic
        let radius = 55;

        basicBird.push(loadImage('assets/BombBirdExploding.png'));
        basicBird.push(loadImage('assets/BombBirdPain.png'));
        basicBird.push(loadImage('assets/BasicBirdDisappear.png'));

        super(x, y, radius, basicBird);

        this.birdAbility = () => {
            level.explosion(this.body.GetPosition(), 20);
            this.toDestroy();
        }
    }
}