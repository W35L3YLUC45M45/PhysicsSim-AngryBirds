



class CustomListener {

  // Collision event functions!
  BeginContact(contact) {
    // Get both fixtures
    let f1 = contact.GetFixtureA();
    let f2 = contact.GetFixtureB();
    // Get both bodies
    let b1 = f1.GetBody();
    let b2 = f2.GetBody();

    // Get our objects that reference these bodies
    let o1 = b1.GetUserData();
    let o2 = b2.GetUserData();

    //TODO your COLLISION HANDLER
    if (o2 instanceof Bird && o1 instanceof Box) {
      //console.log("xoquen bird box!")
      if (o1 instanceof Lava) o2.destroyNow();

      o2.toDestroy();

      let birdV = createVector(b2.m_linearVelocity.x,b2.m_linearVelocity.y);

      if(o1 instanceof Tnt){
        o1.damage();
        level.explosion(o1.body.GetPosition(), 40);
      } else if(birdV.mag() > 30){
        o1.damage();
        //aqui es tenen en compte col·lisions especials: groc amb fusta i blau amb gel
        if(o2 instanceof YellowBird && o1 instanceof Fusta) o1.damage();
        else if(o2 instanceof BlueBird && o1 instanceof Gel) o1.damage();
      } 
    }

    if (o2 instanceof Bird && o1 instanceof Pig) {
      //console.log("xoquen bird-pig!")
      //Utilitzar la velocitat per rebentar el cerdito
      let birdV = createVector(b2.m_linearVelocity.x,b2.m_linearVelocity.y)
      //console.log(birdV.mag());
      if(birdV.mag() > 30) o1.damage();
      o2.toDestroy();
    }

    

    if (o2 instanceof Bird && o1 instanceof Boundary) {
      //console.log("xoquen Bird-terra!")
      o2.toDestroy();
    }

    //Probablement treure això d'aquí, xd
    if (o2 instanceof Pig && o1 instanceof Boundary) {
      //console.log("xoquen Pig terra!")
      o2.damage();
    }
   
  }

  // Objects stop touching each other
  EndContact(contact) {};

  PreSolve(contact, manifold) {};

  PostSolve(contact, manifold) {};
}