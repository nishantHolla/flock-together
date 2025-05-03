let particles = [];

/*
 * P5JS function called once at the start
 */
function setup() {
  createCanvas(windowWidth, windowHeight, P2D, DOM_CANVAS);

  for (let i = 0; i < DEFAULT_PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

}

/*
 * P5JS function called at each frame to draw the canvas
 */
function draw() {
  background(COLOR_CANVAS_BG);

  for (const particle of particles) {
    particle.update();
    particle.wrapAround();
    particle.draw();
  }
}

/*
 * P5JS function called when window size changes
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
