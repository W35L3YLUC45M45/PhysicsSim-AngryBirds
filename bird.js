
class Bird{
  constructor(x, y, d, imgAsset) {
    this.r = d*0.5; // Radi de l'ocell
    this.imgAsset = imgAsset; // Imatge de l'ocell
    this.timer = 0; // Temps des de que l'ocell xoca fins que cau al sòl
    this.deathTime = 100; // 
    this.currentStatus = 0; //0 està viu l'ocell // 1 ha col·lisionat // 2 is toDestroy
    this.abilityUsed = false //marca si l'ocell ha dut a terme l'habilitat

    // Define a body
    let bd = new box2d.b2BodyDef();

    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x, y);

    // Define a fixture
    let fd = new box2d.b2FixtureDef();
    // Fixture holds shape
    fd.shape = new box2d.b2CircleShape();
    fd.shape.m_radius = scaleToWorld(this.r);

    //TODO your physics
    fd.density = 5.0;
    fd.friction = 0.5;
    fd.restitution = 0.3;

    // Create the body
    this.body = world.CreateBody(bd);
    // Attach the fixture
    this.body.CreateFixture(fd);

    // Some additional stuff
    this.body.SetUserData(this);
  }

  setVelocity(vel){
    this.body.SetLinearVelocity(new box2d.b2Vec2(vel.x,vel.y));
     
  }

  destroyNow() {
    this.toDestroy();
    console.log("Destroy")
    this.currentStatus = 2;
    this.timer = this.deathTime + 11;
  }

  toDestroy() {
    //console.log("Destroy")
    this.currentStatus = 1;
    this.toRemove = true;
  }


  done() {
    if (this.toRemove && !this.removed) {
      if(this.timer > this.deathTime){
        this.currentStatus = 2;
      }
      if(this.timer > this.deathTime+10){
        world.DestroyBody(this.body);
        this.removed = true;
      }else{
        this.timer++;
      }

    }
    return this.removed;
  }


  // Drawing the Particle
  display() {
    let pos = scaleToPixels(this.body.GetPosition());
    let a = this.body.GetAngleRadians();
    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    fill(127);
    stroke(200);
    strokeWeight(2);
    ellipse(0, 0, this.r * 2, this.r * 2);
    line(0, 0, this.r, 0);
    pop();
  }

  displayAsset() {
  
    let pos = scaleToPixels(this.body.GetPosition());
    let a = this.body.GetAngleRadians();
    // Draw it!
    push();
    translate(pos.x, pos.y);
    rotate(a);
    image(this.imgAsset[this.currentStatus],-this.r,-this.r, 2*this.r, 2*this.r);
    pop();
  }

  birdAbility(){
    console.log("SKERE");
  }

  applyBlastImpulse(blastCenter, applyPoint, blastPower) {
    let direction = createVector(blastCenter.x-applyPoint.x, blastCenter.y-applyPoint.y);
    direction.normalize().mult(-1);
    //console.log(direction);
    this.setVelocity(direction.mult(blastPower));
  }
}