import * as THREE from 'three';

import { GLOW_TEXTURE_SIZE } from '@/constants/background';

/**
 * Soft radial sprite generated at runtime — gives point sprites a subtle glow
 * without bloom. Shared by the particle field and the data-flow pulses.
 */
export const createGlowTexture = (): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = GLOW_TEXTURE_SIZE;
  canvas.height = GLOW_TEXTURE_SIZE;

  const context = canvas.getContext('2d');

  if (context) {
    const half = GLOW_TEXTURE_SIZE / 2;
    const gradient = context.createRadialGradient(half, half, 0, half, half, half);

    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.35, 'rgba(255, 255, 255, 0.45)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, GLOW_TEXTURE_SIZE, GLOW_TEXTURE_SIZE);
  }

  return new THREE.CanvasTexture(canvas);
};
