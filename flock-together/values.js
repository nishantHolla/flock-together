// ---------------------
// DOM Elements
// ---------------------

const DOM_CANVAS = document.querySelector("canvas");

const DOM_ALIGNMENT_SLIDER = document.querySelector("#alignment-slider");
const DOM_COHESION_SLIDER = document.querySelector("#cohesion-slider");
const DOM_SEPARATION_SLIDER = document.querySelector("#separation-slider");
const DOM_PARTICLE_SLIDER = document.querySelector("#particle-slider");

const DOM_ALIGNMENT_VALUE = document.querySelector("#alignment-value");
const DOM_COHESION_VALUE = document.querySelector("#cohesion-value");
const DOM_SEPARATION_VALUE = document.querySelector("#separation-value");
const DOM_PARTICLE_VALUE = document.querySelector("#particle-value");

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

const DEFAULT_PARTICLE_COUNT = 300;
const PERCEPTION_RADIUS = 50;
const QUAD_TREE_CAPACITY = 4;

const MAX_PARTICLE_SPEED = 2;
const MAX_STEERING_FORCE = 0.05;
let ALIGNMENT_VALUE = 1;
let COHESION_VALUE = 1;
let SEPARATION_VALUE = 1.5;
let PARTICLE_COUNT = DEFAULT_PARTICLE_COUNT;
