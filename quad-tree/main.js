/*
 * P5JS function called once at the start
 */
function setup() {
  createCanvas(windowWidth, windowHeight, P2D, DOM_CANVAS);
}

/*
 * P5JS function called at each frame to draw the canvas
 */
function draw() {
  background(COLOR_CANVAS_BG);
}

/*
 * P5JS function called when window size changes
 */
function windowResize() {
  resizeCanvas(windowWidth, windowHeight);
}
