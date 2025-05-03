/*
 * Region class defines a circular region on the canvas
 */
class Region {
  /*
   * Constructs the Region object
   * @param {Vector} center: Center of the region, center of canvas is taken as default
   * @param {number} radius: Radius of the region, DEFAULT_REGION_RADIUS is taken as default
   */
  constructor(center, radius) {
    if (!radius || radius < 0) {
      radius = DEFAULT_REGION_RADIUS;
    }

    this.center = center || createVector(width / 2, height / 2);
    this.radius = radius;
  }

  /*
   * Check if a position vector is inside the region
   * @param {Vector} position: Position to check
   * @return {boolean} result: true if the position vector is inside the region, false otherwise
   */
  contains(position) {
    const d = p5.Vector.dist(position, this.center);
    return (d < this.radius);
  }


  /*
   * Draws the region onto the canvas
   */
  draw() {
    stroke(COLOR_REGION_POINT);
    strokeWeight(REGION_CENTER_SIZE);
    point(this.center);

    stroke(COLOR_REGION_BOUNDARY);
    strokeWeight(REGION_BOUNDARY_SIZE);
    noFill();
    circle(this.center.x, this.center.y, this.radius * 2);
  }
};
