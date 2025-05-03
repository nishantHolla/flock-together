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
   */
  draw() {
    stroke(COLOR_POINT);
    strokeWeight(PARTICLE_SIZE);
    point(this.position.x, this.position.y);
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
