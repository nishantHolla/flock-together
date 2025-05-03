# Flock Together

This repository contains a Boids Flocking Simulator implemented in Javascript using P5JS.<br />
It simulates the emergent behavior of flocking, inspired by Craig Reynolds' original [Boids model](https://www.red3d.com/cwr/boids/)
(1986), and scales efficiently to large flock sizes by using a QuadTree data structure for spatial partitioning.
<br />
Without optimization, each boid checks all others to compute flocking forces (O(n²)), which becomes costly for large flocks.
With the QuadTree, neighborhood searches are reduced to local regions, making the simulation much faster even with thousands of boids.
<br />

Flocking simulator: [https://nishantholla.github.io/flock-together/flock-together/](https://nishantholla.github.io/flock-together/flock-together/)<br />
<br />
Quad Tree visualizer: [https://nishantholla.github.io/flock-together/quad-tree/](https://nishantholla.github.io/flock-together/quad-tree/)<br />

## Boids model

Each agent updates its velocity based on three steering rules:
- Separation: Avoid crowding neighbors.
- Alignment: Align heading with nearby flockmates.
- Cohesion: Move toward the average position of neighbors.

## QuadTree

Instead of brute-force searching all boids, we insert all boids into a QuadTree each frame.
When computing neighbors, each boid queries only its local region, dramatically reducing computations.
