class Box {
  constructor(x, y, w, h, hp, friction, density, imgAsset, type) { // x & y spawn coordinates
    this.w = w; // width of the box
    this.h = h; // height of the box
    this.removed = false;  // flag state
    this.toRemove = false;  // action flag
    this.imgAsset = imgAsset; // box image source
    this.hp = hp; // health points
    
    // Define a body
    let bd = new box2d.b2BodyDef();
    bd.type = type; // The body type: static, kinematic, or dynamic. Note: if a dynamic body would have zero mass, the mass is set to one.
    bd.position = scaleToWorld(x, y); // Convert from pixel to world coordinates, vectors, or scalars.
    bd.fixedRotation = false; // 	Should this body be prevented from rotating? Useful for characters.

    // Define a fixture
    let fd = new box2d.b2FixtureDef();
    // Fixture holds shape
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(scaleToWorld(this.w / 2), scaleToWorld(this.h / 2)); // Convert from pixel to world coordinates, vectors, or scalars.

    //TODO your physics
    fd.density = density;
    fd.friction = friction;
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
  
  toDestroy(){
    this.toRemove = true; 
  }

  damage(){
    if(this.hp > 0){
      this.hp--;
    } 
    if(this.hp == 0) {
      this.toDestroy();
    }
  }

  done(){
    if(this.toRemove && !this.removed){
      world.DestroyBody(this.body);
      this.removed = true;
    }
    return this.removed
  }


  // Drawing the box
  display() {
    // Get the body's position
    let pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    let a = this.body.GetAngleRadians();
    // Draw it!
    rectMode(CENTER);
      push();
      translate(pos.x, pos.y);
      rotate(a);
      fill(127);
      stroke(200);
      strokeWeight(2);
      rect(0, 0, this.w, this.h);
    pop();
  }

   // Drawing the box
   displayAsset() {
    // Get the body's position
    let pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    let a = this.body.GetAngleRadians();
    // Draw it!
      push();
      translate(pos.x, pos.y);
      rotate(a);
      try{
        image(this.imgAsset[this.hp-1],-this.w*0.5,-this.w*0.5);
      }catch(e){
        image(this.imgAsset[0],-this.w*0.5,-this.w*0.5);
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