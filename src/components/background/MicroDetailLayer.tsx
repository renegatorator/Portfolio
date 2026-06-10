import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

import { MICRO_DEPTH_FADE_MIN, MICRO_DETAILS } from '@/constants/background';
import type { BackgroundPalette } from '@/types/background';

interface MicroDetailLayerProps {
  palette: BackgroundPalette;
}

// Mulberry32 — tiny deterministic PRNG so the layout is stable across mounts.
const createSeededRandom = (seed: number) => {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) | 0;

    let t = Math.imul(state ^ (state >>> 15), state | 1);

    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/** Deeper placements fade toward MICRO_DEPTH_FADE_MIN via per-vertex alpha. */
const depthAlpha = (z: number): number => {
  const [near, far] = MICRO_DETAILS.depthRange;
  const depth = (z - near) / (far - near);

  return 1 + (MICRO_DEPTH_FADE_MIN - 1) * depth;
};

/**
 * One static geometry holding every microdetail: tiny "+" coordinate markers,
 * small blueprint-like grid fragments and short dashed runs. Built once,
 * never updated — zero per-frame cost.
 */
const createMicroDetailGeometry = (): THREE.BufferGeometry => {
  const random = createSeededRandom(MICRO_DETAILS.seed);
  const positions: number[] = [];
  const colors: number[] = [];

  const pushSegment = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    z: number,
    alpha: number,
  ) => {
    positions.push(x1, y1, z, x2, y2, z);
    colors.push(1, 1, 1, alpha, 1, 1, 1, alpha);
  };

  const randomPlacement = () => ({
    x: (random() * 2 - 1) * MICRO_DETAILS.extentX,
    y: (random() * 2 - 1) * MICRO_DETAILS.extentY,
    z:
      MICRO_DETAILS.depthRange[0] +
      (MICRO_DETAILS.depthRange[1] - MICRO_DETAILS.depthRange[0]) * random(),
  });

  for (let marker = 0; marker < MICRO_DETAILS.markerCount; marker++) {
    const { x, y, z } = randomPlacement();
    const alpha = depthAlpha(z);
    const half = MICRO_DETAILS.markerSize / 2;

    pushSegment(x - half, y, x + half, y, z, alpha);
    pushSegment(x, y - half, x, y + half, z, alpha);
  }

  for (let grid = 0; grid < MICRO_DETAILS.gridCount; grid++) {
    const { x, y, z } = randomPlacement();
    const alpha = depthAlpha(z);
    const size = MICRO_DETAILS.gridSize;
    const step = size / MICRO_DETAILS.gridCells;

    for (let line = 0; line <= MICRO_DETAILS.gridCells; line++) {
      const offset = line * step;

      pushSegment(x, y + offset, x + size, y + offset, z, alpha);
      pushSegment(x + offset, y, x + offset, y + size, z, alpha);
    }
  }

  for (let run = 0; run < MICRO_DETAILS.dashRunCount; run++) {
    const { x, y, z } = randomPlacement();
    const alpha = depthAlpha(z);
    const angle = random() * Math.PI * 2;
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);
    const stride = MICRO_DETAILS.dashLength + MICRO_DETAILS.dashGap;

    for (let dash = 0; dash < MICRO_DETAILS.dashesPerRun; dash++) {
      const startX = x + dirX * stride * dash;
      const startY = y + dirY * stride * dash;

      pushSegment(
        startX,
        startY,
        startX + dirX * MICRO_DETAILS.dashLength,
        startY + dirY * MICRO_DETAILS.dashLength,
        z,
        alpha,
      );
    }
  }

  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  // itemSize 4 (RGBA) enables three's per-vertex alpha for the depth fade.
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));

  return geometry;
};

const MicroDetailLayer = ({ palette }: MicroDetailLayerProps) => {
  const geometry = useMemo(() => createMicroDetailGeometry(), []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <lineSegments geometry={geometry} frustumCulled={false}>
      <lineBasicMaterial
        color={palette.hud}
        vertexColors
        transparent
        opacity={palette.microOpacity}
        depthWrite={false}
      />
    </lineSegments>
  );
};

export default MicroDetailLayer;
