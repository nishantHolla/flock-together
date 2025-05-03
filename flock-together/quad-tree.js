/*
 * Boundary class to define the boundary of a quad tree node
 */
class Boundary {
  /*
   * Constructs the Boundary object
   * @param {Vector} center: Center of the boundary, zero vector is taken if null
   * @param {number} halfWidth: Horizontal distance between the center and the edge of the boundary
   * @param {number} halfHeight: Vertical distance between the center and the edge of the boundary
   */
  constructor(center, halfWidth, halfHeight) {
    this.center = center || createVector(0, 0);
    this.halfWidth = halfWidth;
    this.halfHeight = halfHeight;
  }

  /*
   * Check if a given position is inside the boundary
   * @param {Vector} position: Position to check
   * @return {booelan} result: true if position is inside the boundary, false otherwise
   */
  contains(position) {
    return (
      position.x <= this.center.x + this.halfWidth &&
        position.x >= this.center.x - this.halfWidth &&
        position.y <= this.center.y + this.halfHeight &&
        position.y >= this.center.y - this.halfHeight
    )
  }

  /*
   * Check if given region intersects with the boundary
   * @param {Region} region: Region to check for intersection
   * @return {boolean} result: ture if region intersects with the boundary, false otherwise
   */
  intersects(region) {
    const rx = this.center.x;
    const ry = this.center.y;
    const hw = this.halfWidth;
    const hh = this.halfHeight;

    const cx = region.center.x;
    const cy = region.center.y;
    const r = region.radius;

    const closestX = constrain(cx, rx - hw, rx + hw);
    const closestY = constrain(cy, ry - hh, ry + hh);

    const distance = dist(cx, cy, closestX, closestY);
    return distance <= r;
  }

  /*
   * Draw the boundary onto the canvas
   */
  draw() {
    stroke(COLOR_QUAD_TREE_BOUNDARY);
    strokeWeight(QUAD_TREE_BOUNDARY_SIZE);
    rectMode(CENTER);
    rect(this.center.x, this.center.y, this.halfWidth * 2, this.halfHeight * 2);
  }
};

/*
 * Quad Tree class to store set of particles
 */
class QuadTree {
  /*
   * Constructs the QuadTree object
   * @param {Boundary} boundary: Boundary of the quad tree node
   * @param {number} capacity: Capacity of the quad tree node after which it subdivides
   */
  constructor(boundary, capacity) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.particles = [];
    this.children = null;
  }

  /*
   * Insert a particle to the quad tree node
   * @param {Particle} particle: Particle to insert
   * @return {boolean} result: true if successful insertion, false otherwise
   */
  insert(particle) {
    if (!this.boundary.contains(particle.position)) {
      return false;
    }

    if (this.children) {
      for (const child of Object.values(this.children)) {
        if (child.insert(particle)) {
          return true;
        }
      }
    }
    else if (this.particles.length < this.capacity) {
      this.particles.push(particle);
      return true;
    }
    else {
      this.subdivide();
      for (const child of Object.values(this.children)) {
        if (child.insert(particle)) {
          return true;
        }
      }
    }

    return false;
  }

  /*
   * Subdivides the current quad tree node into 4 quadrands
   */
  subdivide() {
    if (this.children) {
      return;
    }

    const {x, y} = this.boundary.center;
    const w = this.boundary.halfWidth / 2;
    const h = this.boundary.halfHeight / 2;

    const nw = new Boundary(createVector(x - w, y - h), w, h);
    const ne = new Boundary(createVector(x + w, y - h), w, h);
    const sw = new Boundary(createVector(x - w, y + h), w, h);
    const se = new Boundary(createVector(x + w, y + h), w, h);

    this.children = {
      northWest: new QuadTree(nw, this.capacity),
      northEast: new QuadTree(ne, this.capacity),
      southWest: new QuadTree(sw, this.capacity),
      southEast: new QuadTree(se, this.capacity)
    }

    for (const particle of this.particles) {
      for (const child of Object.values(this.children)) {
        if (child.insert(particle)) {
          break;
        }
      }
    }

    this.particles = [];
  }

  /*
   * Quey the quad tree for points within the given region
   * @param {Region} region: Region to be searched
   * @param {Particle[]} found: Particles that are found to be in the region (needed for recursion, do not set this to anything)
   * @return {Particle[]} found: Particles that are found to be in the region
   */
  query(region, found = []) {
    if (!this.boundary.intersects(region)) {
      return found;
    }

    if (this.children) {
      for (const child of Object.values(this.children)) {
        child.query(region, found);
      }
    }
    else {
      for (const particle of this.particles) {
        if (region.contains(particle.position)) {
          found.push(particle);
        }
      }
    }

    return found;
  }

  /*
   * Run callback function for each quda tree node under current node
   * @param {(QuadTree) => {}} callback: Callback function to run which accepts a quad tree node
   */
  forEach(callback) {
    callback(this);

    if (!this.children) {
      return;
    }

    for (const child of Object.values(this.children)) {
      child.forEach(callback);
    }
  }
};
