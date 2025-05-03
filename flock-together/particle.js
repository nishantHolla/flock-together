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
    fill(COLOR_CANVAS_FG);

    translate(this.position);

    const head = this.velocity.copy().setMag(PARTICLE_SIZE);
    const leftTail = head.copy().rotate(120 * DEG_TO_RAD);
    const back = head.copy().mult(-1).setMag(PARTICLE_SIZE/4);
    const rightTail = head.copy().rotate(-120 * DEG_TO_RAD);

    beginShape();
    vertex(head.x, head.y);
    vertex(leftTail.x, leftTail.y);
    vertex(back.x, back.y);
    vertex(rightTail.x, rightTail.y);
    endShape(CLOSE);

    pop();
  }

  /*
   * Updates the particle for the current frame
   */
  update(neighbors) {
    this.acceleration.set(0, 0);

    const alignment = this.align(neighbors);
    const cohesion = this.cohesion(neighbors);
    const separation = this.separation(neighbors);

    alignment.mult(ALIGNMENT_VALUE);
    cohesion.mult(COHESION_VALUE);
    separation.mult(SEPARATION_VALUE);

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);

    this.velocity.add(this.acceleration);
    this.velocity.limit(MAX_PARTICLE_SPEED);
    this.position.add(this.velocity);
  }

  /*
   * Steer towards average velocity of a list of particles
   * @param {Particles[]} neighbors: List of particles to align to
   * @return {Vector} steeringForce: Steering force required for the alignment
   */
  align(neighbors) {
    const steeringForce = createVector(0, 0);
    let total = 0;

    for (const particle of neighbors) {
      if (particle != this) {
        steeringForce.add(particle.velocity);
        total++;
      }
    }

    if (total > 0) {
      steeringForce.div(total);
      steeringForce.setMag(MAX_PARTICLE_SPEED);
      steeringForce.sub(this.velocity);
      steeringForce.limit(MAX_STEERING_FORCE);
    }

    return steeringForce;
  }

  /*
   * Steer towards average position of a list of particles
   * @param {Particles[]} neighbors: List of particles to unite to
   * @return {Vector} steeringForce: Steering force required for the cohesion
   */
  cohesion(neighbors) {
    const steeringForce = createVector(0, 0);
    let total = 0;

    for (const particle of neighbors) {
      if (particle !== this) {
        steeringForce.add(particle.position);
        total++;
      }
    }

    if (total > 0) {
      steeringForce.div(total);
      steeringForce.sub(this.position);
      steeringForce.setMag(MAX_PARTICLE_SPEED);
      steeringForce.sub(this.velocity);
      steeringForce.limit(MAX_STEERING_FORCE);
    }

    return steeringForce;
  }

  /*
   * Steer away to avoid crowding of list of particles
   * @param {Particles[]} neighbors: List of particles to separate from
   * @return {Vector} steeringForce: Steering force required for the separation
   */
  separation(neighbors) {
    const steeringForce = createVector(0, 0);
    let total = 0;

    for (const particle of neighbors) {
      if (particle !== this) {
        const diff = p5.Vector.sub(this.position, particle.position);
        const d = dist(this.position, particle.position);
        if (d > 0) {
          diff.div(d);
        }
        steeringForce.add(diff);
        total++;
      }
    }

    if (total > 0) {
      steeringForce.div(total);
      steeringForce.setMag(MAX_PARTICLE_SPEED);
      steeringForce.sub(this.velocity);
      steeringForce.limit(MAX_STEERING_FORCE);
    }

    return steeringForce;
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
