class CustomShape {
    constructor(x, y) {
  
      // Define a body
      let bd = new box2d.b2BodyDef();
      bd.type = box2d.b2BodyType.b2_dynamicBody;
      bd.position = scaleToWorld(x, y);
  
      // Define a fixture
      let fd = new box2d.b2FixtureDef();
      let size = 40;
      let vertices = [];
      vertices[0] = scaleToWorld(-size, -size);
      vertices[1] = scaleToWorld(size, -size);
      vertices[2] = scaleToWorld(size, size);
      vertices[3] = scaleToWorld(-size*2, size);
      
  

      fd.shape = new box2d.b2PolygonShape();
      fd.shape.SetAsArray(vertices, vertices.length);

 
      // Some physics
      fd.density = 1.0;
      fd.friction = 0.5;
      fd.restitution = 0.2;
  
      // Create the body
      this.body = world.CreateBody(bd);
      // Attach the fixture
      this.body.CreateFixture(fd);
  
      // Some additional stuff
      //this.body.SetLinearVelocity(new Vec2(random(-5, 5), random(2, 5)));
      //this.body.SetAngularVelocity(random(-5,5));
    }
  
    // This function removes the particle from the box2d world
    killBody() {
      world.DestroyBody(this.body);
    }
  
    // Is the particle ready for deletion?
    done() {
      // Let's find the screen position of the particle
      let pos = scaleToPixels(this.body.GetPosition());
      // Is it off the bottom of the screen?
      if (pos.y > height + this.w * this.h) {
        this.killBody();
        return true;
      }
      return false;
    }
  
    // Drawing the box
    display() {
      // Get the body's position
      let pos = scaleToPixels(this.body.GetPosition());
      // Get its angle of rotation
      let a = this.body.GetAngleRadians();
  
      // Draw it!
      let f = this.body.GetFixtureList();
      let ps = f.GetShape();
  
      rectMode(CENTER);
      push();
      translate(pos.x, pos.y);
      //println(pos.x + " " + pos.y);
      rotate(a);
   
      fill(127);
      stroke(200);
      strokeWeight(2);
      beginShape();
      // For every vertex, convert to pixel vector
      for (let i = 0; i < ps.m_count; i++) {
        let v = scaleToPixels(ps.m_vertices[i]);
        vertex(v.x, v.y);
      }
      endShape(CLOSE);
    fill(100)
    ellipse(0, 0, 2, 2);
    fill(100,0,0)


      pop();
    }
  }