import { useFrame } from '@react-three/fiber';
import { RefObject, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { DATA_FLOW, MAX_FRAME_DELTA_S } from '@/constants/background';
import type {
  BackgroundPalette,
  BackgroundTierConfig,
  ParticleSimulation,
} from '@/types/background';

import { createGlowTexture } from './glowTexture';
import { findConnectedPair, particleDistanceSq } from './particleSimulation';

interface DataFlowLayerProps {
  simulation: ParticleSimulation;
  config: BackgroundTierConfig;
  palette: BackgroundPalette;
  animated: boolean;
  /** Smoothed scroll velocity (viewport-heights per second) from the Scene. */
  scrollVelocityRef: RefObject<number>;
}

interface PulseState {
  from: number;
  to: number;
  /** Normalized travel progress along the edge; meaningful only while active. */
  progress: number;
  duration: number;
  /** Seconds until an inactive pulse tries to spawn again. */
  cooldown: number;
  active: boolean;
}

const POSITION_COMPONENTS = 3;
// itemSize 4 (RGBA) enables three's per-vertex alpha, used for the fade in/out.
const COLOR_COMPONENTS = 4;
// Head sprite plus its trailing sprites, all in the same buffer / draw call.
const SPRITES_PER_PULSE = 1 + DATA_FLOW.trailCount;

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

/** Trapezoid envelope: ramps up over fadePortion, holds 1, ramps back down. */
const pulseAlpha = (progress: number): number =>
  Math.min(progress / DATA_FLOW.fadePortion, (1 - progress) / DATA_FLOW.fadePortion, 1);

/**
 * A small pool of bright pulses traveling along currently-connected particle
 * pairs (Layer: data flow). Each pulse lerps between the live particle
 * positions, so it follows its connection line even while the ends drift.
 */
const DataFlowLayer = ({
  simulation,
  config,
  palette,
  animated,
  scrollVelocityRef,
}: DataFlowLayerProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const glowTexture = useMemo(() => createGlowTexture(), []);

  const { geometry, positions, colors, pulses } = useMemo(() => {
    const pulseCount = config.pulseCount;
    const spriteCount = pulseCount * SPRITES_PER_PULSE;
    const positionArray = new Float32Array(spriteCount * POSITION_COMPONENTS);
    // RGB stays at 1 so the material color drives the hue; only alpha is rewritten.
    const colorArray = new Float32Array(spriteCount * COLOR_COMPONENTS).fill(1);

    for (let sprite = 0; sprite < spriteCount; sprite++) {
      colorArray[sprite * COLOR_COMPONENTS + 3] = 0;
    }

    const positionAttribute = new THREE.BufferAttribute(positionArray, POSITION_COMPONENTS);
    const colorAttribute = new THREE.BufferAttribute(colorArray, COLOR_COMPONENTS);

    positionAttribute.setUsage(THREE.DynamicDrawUsage);
    colorAttribute.setUsage(THREE.DynamicDrawUsage);

    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute('position', positionAttribute);
    bufferGeometry.setAttribute('color', colorAttribute);

    // Staggered initial cooldowns keep spawns asynchronous from the first frame.
    const pulseStates: PulseState[] = Array.from({ length: pulseCount }, () => ({
      from: 0,
      to: 0,
      progress: 0,
      duration: DATA_FLOW.travelDuration.min,
      cooldown: randomBetween(0, DATA_FLOW.cooldown.max),
      active: false,
    }));

    return {
      geometry: bufferGeometry,
      positions: positionArray,
      colors: colorArray,
      pulses: pulseStates,
    };
  }, [config.pulseCount]);

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => glowTexture.dispose(), [glowTexture]);

  useFrame((_, delta) => {
    if (!animated || !pointsRef.current) {
      return;
    }

    const dt = Math.min(delta, MAX_FRAME_DELTA_S);
    const maxDistanceSq = config.connectionDistance * config.connectionDistance;
    const speedFactor =
      1 +
      Math.min(
        Math.abs(scrollVelocityRef.current) * DATA_FLOW.scrollBoost,
        DATA_FLOW.maxScrollBoost,
      );

    pulses.forEach((pulse, index) => {
      if (!pulse.active) {
        pulse.cooldown -= dt;

        if (pulse.cooldown <= 0) {
          const pair = findConnectedPair(simulation, config.connectionDistance);

          if (pair) {
            [pulse.from, pulse.to] = pair;
            pulse.progress = 0;
            pulse.duration = randomBetween(
              DATA_FLOW.travelDuration.min,
              DATA_FLOW.travelDuration.max,
            );
            pulse.active = true;
          } else {
            pulse.cooldown = DATA_FLOW.retryDelay;
          }
        }
      }

      if (pulse.active) {
        pulse.progress += (dt * speedFactor) / pulse.duration;

        // Route broke (ends drifted apart): skip straight into the fade-out
        // so the pulse vanishes smoothly instead of popping.
        const fadeOutStart = 1 - DATA_FLOW.fadePortion;

        if (
          pulse.progress < fadeOutStart &&
          particleDistanceSq(simulation, pulse.from, pulse.to) > maxDistanceSq
        ) {
          pulse.progress = fadeOutStart;
        }

        if (pulse.progress >= 1) {
          pulse.active = false;
          pulse.cooldown = randomBetween(DATA_FLOW.cooldown.min, DATA_FLOW.cooldown.max);
        }
      }

      const spriteBase = index * SPRITES_PER_PULSE;

      if (!pulse.active) {
        for (let sprite = 0; sprite < SPRITES_PER_PULSE; sprite++) {
          colors[(spriteBase + sprite) * COLOR_COMPONENTS + 3] = 0;
        }
        return;
      }

      const fromOffset = pulse.from * POSITION_COMPONENTS;
      const toOffset = pulse.to * POSITION_COMPONENTS;
      const particlePositions = simulation.positions;

      // Sprite 0 is the head; the rest trail behind it at fixed progress offsets
      // with decaying alpha, reading as a tapering light streak.
      for (let sprite = 0; sprite < SPRITES_PER_PULSE; sprite++) {
        const spriteProgress = pulse.progress - sprite * DATA_FLOW.trailSpacing;
        const alphaIndex = (spriteBase + sprite) * COLOR_COMPONENTS + 3;

        if (spriteProgress < 0 || spriteProgress > 1) {
          colors[alphaIndex] = 0;
          continue;
        }

        const positionOffset = (spriteBase + sprite) * POSITION_COMPONENTS;

        for (let axis = 0; axis < POSITION_COMPONENTS; axis++) {
          positions[positionOffset + axis] =
            particlePositions[fromOffset + axis] +
            (particlePositions[toOffset + axis] - particlePositions[fromOffset + axis]) *
              spriteProgress;
        }

        const trailDecay = 1 - sprite / SPRITES_PER_PULSE;

        colors[alphaIndex] = pulseAlpha(spriteProgress) * trailDecay;
      }
    });

    const liveGeometry = pointsRef.current.geometry;

    liveGeometry.attributes.position.needsUpdate = true;
    liveGeometry.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        map={glowTexture}
        color={palette.pulse}
        size={DATA_FLOW.size}
        sizeAttenuation
        vertexColors
        transparent
        opacity={palette.pulseOpacity}
        blending={palette.pulseAdditive ? THREE.AdditiveBlending : THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default DataFlowLayer;
