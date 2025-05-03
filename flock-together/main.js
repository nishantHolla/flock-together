let particles = [];
let quadTree;
let rootBoundary;

/*
 * P5JS function called once at the start
 */
function setup() {
  createCanvas(windowWidth, windowHeight, P2D, DOM_CANVAS);

  for (let i = 0; i < DEFAULT_PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  DOM_ALIGNMENT_SLIDER.value = ALIGNMENT_VALUE;
  DOM_ALIGNMENT_VALUE.innerText = String(ALIGNMENT_VALUE);
  DOM_ALIGNMENT_SLIDER.addEventListener("input", () => {
    ALIGNMENT_VALUE = parseFloat(DOM_ALIGNMENT_SLIDER.value);
    DOM_ALIGNMENT_VALUE.innerText = String(ALIGNMENT_VALUE);
  })

  DOM_COHESION_SLIDER.value = COHESION_VALUE;
  DOM_COHESION_VALUE.innerText = String(COHESION_VALUE);
  DOM_COHESION_SLIDER.addEventListener("input", () => {
    COHESION_VALUE = parseFloat(DOM_COHESION_SLIDER.value);
    DOM_COHESION_VALUE.innerText = String(COHESION_VALUE);
  })

  DOM_SEPARATION_SLIDER.value = SEPARATION_VALUE;
  DOM_SEPARATION_VALUE.innerText = String(SEPARATION_VALUE);
  DOM_SEPARATION_SLIDER.addEventListener("input", () => {
    SEPARATION_VALUE = parseFloat(DOM_SEPARATION_SLIDER.value);
    DOM_SEPARATION_VALUE.innerText = String(SEPARATION_VALUE);
  })

  DOM_PARTICLE_SLIDER.value = PARTICLE_COUNT;
  DOM_PARTICLE_VALUE.innerText = String(PARTICLE_COUNT);
  DOM_PARTICLE_SLIDER.addEventListener("input", () => {
    const diff = PARTICLE_COUNT - parseInt(DOM_PARTICLE_SLIDER.value);
    if (diff > 0) {
      console.log("Decreasing");
      for (let i = 0; i < diff; i++) {
        const v = random(particles.length);
        particles.splice(v, 1);
      }
      PARTICLE_COUNT = particles.length;
    }
    else {
      console.log("Increasing");
      for (let i = diff; i < 0; i++) {
        particles.push(new Particle());
      }
      PARTICLE_COUNT = particles.length;
    }
    DOM_PARTICLE_VALUE.innerText = String(PARTICLE_COUNT);
  })
}

/*
 * P5JS function called at each frame to draw the canvas
 */
function draw() {
  rootBoundary = new Boundary(createVector(width/2, height/2), width/2, height/2);
  quadTree = new QuadTree(rootBoundary, QUAD_TREE_CAPACITY);

  for (const particle of particles) {
    quadTree.insert(particle);
  }

  background(COLOR_CANVAS_BG);

  for (const particle of particles) {
    const perceptionRegion = new Region(particle.position, PERCEPTION_RADIUS);
    const neighbors = quadTree.query(perceptionRegion);
    particle.update(neighbors);
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
