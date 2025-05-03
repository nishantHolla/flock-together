// ---------------------
// DOM Elements
// ---------------------

const DOM_CANVAS = document.querySelector("canvas");

// ---------------------
// Colors
// ---------------------

const COLOR_CANVAS_BG = "#e2e8f0";
const COLOR_CANVAS_FG = "#1e293b";
const COLOR_POINT = [0, 255, 0];
const COLOR_QUAD_TREE_BOUNDARY = [0, 255, 0, 40];
const COLOR_FOUND_POINT = [0, 0, 255];
const COLOR_REGION_POINT = [255, 0, 0];
const COLOR_REGION_BOUNDARY = [255, 0, 0, 100];

// ---------------------
// Values
// ---------------------

const PARTICLE_BORDER_THICKNESS = 1;
const PARTICLE_SIZE = 10;
const REGION_CENTER_SIZE = 12;
const REGION_BOUNDARY_SIZE = 4;
const QUAD_TREE_BOUNDARY_SIZE = 4;

const MAX_PARTICLE_SPEED = 4;
const MAX_STEERING_FORCE = 0.1;
const DEFAULT_PARTICLE_COUNT = 400;
const PERCEPTION_RADIUS = 50;
const QUAD_TREE_CAPACITY = 4;
