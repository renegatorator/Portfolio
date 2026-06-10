import {
  FIELD_BOUNDS,
  LINE_DEPTH_FADE_MIN,
  MAX_FRAME_DELTA_S,
  PARTICLE_SPEED,
} from '@/constants/background';
import type { ParticleSimulation } from '@/types/background';

const AXES = 3;
const BOUNDS_BY_AXIS = [FIELD_BOUNDS.x, FIELD_BOUNDS.y, FIELD_BOUNDS.z] as const;

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

const randomSign = () => (Math.random() < 0.5 ? -1 : 1);

export const createParticleSimulation = (count: number): ParticleSimulation => {
  const positions = new Float32Array(count * AXES);
  const velocities = new Float32Array(count * AXES);

  for (let particle = 0; particle < count; particle++) {
    for (let axis = 0; axis < AXES; axis++) {
      const index = particle * AXES + axis;
      const bound = BOUNDS_BY_AXIS[axis];

      positions[index] = randomBetween(-bound, bound);
      velocities[index] = randomBetween(PARTICLE_SPEED.min, PARTICLE_SPEED.max) * randomSign();
    }
  }

  return { count, positions, velocities };
};

/** Advances particle positions, reflecting velocities at the field bounds. */
export const stepParticleSimulation = (simulation: ParticleSimulation, delta: number): void => {
  const dt = Math.min(delta, MAX_FRAME_DELTA_S);
  const { count, positions, velocities } = simulation;

  for (let particle = 0; particle < count; particle++) {
    for (let axis = 0; axis < AXES; axis++) {
      const index = particle * AXES + axis;
      const bound = BOUNDS_BY_AXIS[axis];
      const next = positions[index] + velocities[index] * dt;

      if (next > bound || next < -bound) {
        velocities[index] = -velocities[index];
      }

      positions[index] = Math.max(-bound, Math.min(bound, next));
    }
  }
};

/** Bounds the candidate scan in findConnectedPair so route picking stays O(1)-ish. */
const PAIR_SCAN_LIMIT = 48;

/**
 * Picks a random particle and scans a bounded window of other particles for
 * one within `maxDistance`, i.e. a pair currently joined by a connection
 * line. Returns the pair indices, or null when no neighbour is close enough.
 */
export const findConnectedPair = (
  simulation: ParticleSimulation,
  maxDistance: number,
): readonly [number, number] | null => {
  const { count, positions } = simulation;
  const maxDistanceSq = maxDistance * maxDistance;
  const start = Math.floor(Math.random() * count);
  const ix = positions[start * AXES];
  const iy = positions[start * AXES + 1];
  const iz = positions[start * AXES + 2];
  const scanLimit = Math.min(count - 1, PAIR_SCAN_LIMIT);

  for (let offset = 1; offset <= scanLimit; offset++) {
    const candidate = (start + offset) % count;
    const dx = positions[candidate * AXES] - ix;
    const dy = positions[candidate * AXES + 1] - iy;
    const dz = positions[candidate * AXES + 2] - iz;

    if (dx * dx + dy * dy + dz * dz <= maxDistanceSq) {
      return [start, candidate];
    }
  }

  return null;
};

/** Squared distance between two particles of the simulation. */
export const particleDistanceSq = (
  simulation: ParticleSimulation,
  first: number,
  second: number,
): number => {
  const { positions } = simulation;
  const dx = positions[second * AXES] - positions[first * AXES];
  const dy = positions[second * AXES + 1] - positions[first * AXES + 1];
  const dz = positions[second * AXES + 2] - positions[first * AXES + 2];

  return dx * dx + dy * dy + dz * dz;
};

/** Maps a particle z to an alpha factor: 1 at the near edge, LINE_DEPTH_FADE_MIN at the far edge. */
const depthFadeFactor = (z: number): number =>
  LINE_DEPTH_FADE_MIN + ((1 - LINE_DEPTH_FADE_MIN) * (z + FIELD_BOUNDS.z)) / (2 * FIELD_BOUNDS.z);

/**
 * Writes line segments between every particle pair closer than `maxDistance`
 * into the preallocated buffers, encoding a distance-based fade — scaled by a
 * per-vertex depth fade — into the alpha component of the RGBA color
 * attribute. Returns the segment count.
 */
export const writeConnectionSegments = (
  simulation: ParticleSimulation,
  maxDistance: number,
  maxSegments: number,
  segmentPositions: Float32Array,
  segmentColors: Float32Array,
): number => {
  const POSITION_STRIDE = 6; // two vertices * xyz
  const COLOR_STRIDE = 8; // two vertices * rgba
  const maxDistanceSq = maxDistance * maxDistance;
  const { count, positions } = simulation;

  let segment = 0;

  for (let i = 0; i < count && segment < maxSegments; i++) {
    const ix = positions[i * AXES];
    const iy = positions[i * AXES + 1];
    const iz = positions[i * AXES + 2];

    for (let j = i + 1; j < count && segment < maxSegments; j++) {
      const dx = positions[j * AXES] - ix;
      const dy = positions[j * AXES + 1] - iy;
      const dz = positions[j * AXES + 2] - iz;
      const distanceSq = dx * dx + dy * dy + dz * dz;

      if (distanceSq > maxDistanceSq) {
        continue;
      }

      const jz = iz + dz;
      const alpha = 1 - Math.sqrt(distanceSq) / maxDistance;
      const positionOffset = segment * POSITION_STRIDE;
      const colorOffset = segment * COLOR_STRIDE;

      segmentPositions[positionOffset] = ix;
      segmentPositions[positionOffset + 1] = iy;
      segmentPositions[positionOffset + 2] = iz;
      segmentPositions[positionOffset + 3] = ix + dx;
      segmentPositions[positionOffset + 4] = iy + dy;
      segmentPositions[positionOffset + 5] = iz + dz;

      segmentColors[colorOffset + 3] = alpha * depthFadeFactor(iz);
      segmentColors[colorOffset + 7] = alpha * depthFadeFactor(jz);

      segment++;
    }
  }

  return segment;
};
