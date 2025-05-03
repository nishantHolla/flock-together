/*
 * Particle class defines a point in the canvas
 */
class Particle {
  /*
   * Constructs the Particle object
   * @param {Vector} position: Position of the particle, random vector is taken if null
   * @param {Vector} velocity: Velocity of the particle, random vector is taken if null
   * @param {Vector} acceleration: Acceleration of the particle, zero vector is take if null
   */
  constructor(position, velocity, acceleration) {
    this.position = position || createVector(random(width), random(height));
    this.velocity = velocity || p5.Vector.random2D().setMag(random(MAX_PARTICLE_SPEED));
    this.acceleration = acceleration || createVector(0, 0);
  }

  /*
   * Draws the particle onto the canvas
   * @param {boolean} highlight: Highlight the particle with COLOR_FOUND_POINT color
   */
  draw(highlight = false) {

    push();
    stroke(COLOR_CANVAS_FG);
    strokeWeight(PARTICLE_BORDER_THICKNESS);

    translate(this.position);

    const head = this.velocity.copy().setMag(PARTICLE_SIZE);
    const leftTail = head.copy().rotate(120 * DEG_TO_RAD);
    const rightTail = head.copy().rotate(-120 * DEG_TO_RAD);

    beginShape();
    vertex(head.x, head.y);
    vertex(leftTail.x, leftTail.y);
    vertex(0, 0);
    vertex(rightTail.x, rightTail.y);
    endShape(CLOSE);

    pop();
  }

  /*
   * Updates the particle for the current frame
   */
  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
  }

  /*
   * Wrap around the position of the particle if they exceed the canvas space
   */
  wrapAround() {
    if (this.position.x < 0) {
      this.position.x = width - 1;
    }
    else if (this.position.x > width) {
      this.position.x = 0;
    }

    if (this.position.y < 0) {
      this.position.y = height - 1;
    }
    else if (this.position.y > height) {
      this.position.y = 0;
    }
  }
};
