class Pig {
  constructor(x, y, d, hp, imgAsset) {
    this.r = d * 0.5;
    this.imgAsset = imgAsset;
    this.timer = 0; // Temps des de que l'ocell xoca fins que cau al sòl
    this.deathTime = 100; // 
    this.currentStatus = 0; //0 està viu el pork // 1 ha col·lisionat // 2 is toDestroy
    this.hp = hp;

    // Define a body
    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x, y);

    // Define a fixture
    let fd = new box2d.b2FixtureDef();
    // Fixture holds shape
    fd.shape = new box2d.b2CircleShape();
    fd.shape.m_radius = scaleToWorld(this.r);

    // Some physics
    fd.density = 1;
    fd.friction = 0.5;
    fd.restitution = 0;

    // Create the body
    this.body = world.CreateBody(bd);
    // Attach the fixture
    this.body.CreateFixture(fd);

    this.body.SetUserData(this);
  }

  setVelocity(vel){
    this.body.SetLinearVelocity(new box2d.b2Vec2(vel.x,vel.y));
     
  }

  destroyNow() {
    world.DestroyBody(this.body);
    this.removed = true;
  }

  toDestroy() {
    //console.log("Destroy")
    this.currentStatus = 1;
    this.toRemove = true;
  }

  damage(){
    if(this.hp > 0){
      this.hp--;
    } else {
      this.toDestroy();
    }
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
    if(this.hp > 1){
      image(this.imgAsset[3],-this.r,-this.r, 2*this.r, 2*this.r);
    } else {
      image(this.imgAsset[this.currentStatus],-this.r,-this.r, 2*this.r, 2*this.r);
    }
    pop();
  }

  applyBlastImpulse(blastCenter, applyPoint, blastPower) {
    let direction = createVector(blastCenter.x-applyPoint.x, blastCenter.y-applyPoint.y);
    direction.normalize().mult(-1);
    //console.log(direction);
    this.setVelocity(direction.mult(blastPower));
  }
}
