let particles = [];
let region;
let regionIsDragged;
let regionIsScaled;

/*
 * P5JS function called once at the start
 */
function setup() {
  createCanvas(windowWidth, windowHeight, P2D, DOM_CANVAS);

  for (let i = 0; i < DEFAULT_PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  region = new Region();
  regionIsDragged = false;
  regionIsScaled = false;
}

/*
 * P5JS function called at each frame to draw the canvas
 */
function draw() {
  background(COLOR_CANVAS_BG);

  region.draw();

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

/*
 * P5JS function called when mouse is pressed
 */
function mousePressed() {
  const mousePosition = createVector(mouseX, mouseY);
  const d = p5.Vector.dist(mousePosition, region.center);

  if (d < 10) {
    regionIsDragged = true;
  }
  else if (Math.abs(d - region.radius) < 10) {
    regionIsScaled = true;
  }
}

/*
 * P5JS function called when mouse is dragged
 */
function mouseDragged() {
  if (regionIsDragged) {
    region.center.set(mouseX, mouseY);
  }
  else if (regionIsScaled) {
    const mousePosition = createVector(mouseX, mouseY);
    const d = p5.Vector.dist(mousePosition, region.center);
    region.radius = d;
  }
}

/*
 * P5JS function called when mouse is released
 */
function mouseReleased() {
  regionIsDragged = false;
  regionIsScaled = false;
}

/*
 * P5JS function called when mouse is moved
 */
function mouseMoved() {
  const mousePosition = createVector(mouseX, mouseY);
  const d = p5.Vector.dist(mousePosition, region.center);

  if (d < 10) {
    cursor(MOVE);
  }
  else if (Math.abs(d - region.radius) < 10) {
    cursor('all-scroll');
  }
  else {
    cursor(ARROW);
  }
}
