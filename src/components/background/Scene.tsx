import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

import {
  AMBIENT_SWAY,
  LAYER_PARALLAX,
  PARALLAX,
  SCROLL_VELOCITY_DAMPING,
} from '@/constants/background';
import type { BackgroundPalette, BackgroundTierConfig } from '@/types/background';
import { useScrollParallax } from '@/utils/hooks/useScrollParallax';

import DataFlowLayer from './DataFlowLayer';
import HudLayer from './HudLayer';
import MicroDetailLayer from './MicroDetailLayer';
import NetworkLines from './NetworkLines';
import ParticleField from './ParticleField';
import { createParticleSimulation, stepParticleSimulation } from './particleSimulation';

interface SceneProps {
  config: BackgroundTierConfig;
  palette: BackgroundPalette;
  animated: boolean;
}

const Scene = ({ config, palette, animated }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const hudGroupRef = useRef<THREE.Group>(null);
  const microGroupRef = useRef<THREE.Group>(null);
  const scrollRef = useScrollParallax(animated);
  const previousScrollRef = useRef(0);
  const scrollVelocityRef = useRef(0);

  const simulation = useMemo(
    () => createParticleSimulation(config.particleCount),
    [config.particleCount],
  );

  useFrame((state, delta) => {
    if (!animated) {
      return;
    }

    stepParticleSimulation(simulation, delta);

    const scroll = scrollRef.current;

    // Smoothed scroll velocity (viewport-heights/s) feeds the pulse speed boost.
    const rawVelocity = delta > 0 ? (scroll - previousScrollRef.current) / delta : 0;

    previousScrollRef.current = scroll;
    scrollVelocityRef.current = THREE.MathUtils.damp(
      scrollVelocityRef.current,
      rawVelocity,
      SCROLL_VELOCITY_DAMPING,
      delta,
    );

    const group = groupRef.current;

    if (!group) {
      return;
    }

    const baseOffset = -scroll * PARALLAX.yStrength;

    group.rotation.z =
      Math.sin(state.clock.elapsedTime * AMBIENT_SWAY.frequency) * AMBIENT_SWAY.amplitude;
    group.position.y = THREE.MathUtils.damp(group.position.y, baseOffset, PARALLAX.damping, delta);
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      scroll * PARALLAX.rotationStrength,
      PARALLAX.damping,
      delta,
    );

    // Child layers only carry the *difference* from the base parallax — the
    // parent group already moves everything at 1×.
    if (hudGroupRef.current) {
      hudGroupRef.current.position.y = THREE.MathUtils.damp(
        hudGroupRef.current.position.y,
        baseOffset * (LAYER_PARALLAX.hud - 1),
        PARALLAX.damping,
        delta,
      );
    }

    if (microGroupRef.current) {
      microGroupRef.current.position.y = THREE.MathUtils.damp(
        microGroupRef.current.position.y,
        baseOffset * (LAYER_PARALLAX.micro - 1),
        PARALLAX.damping,
        delta,
      );
    }
  });

  return (
    <group ref={groupRef}>
      <ParticleField simulation={simulation} palette={palette} animated={animated} />
      <NetworkLines simulation={simulation} config={config} palette={palette} animated={animated} />
      <DataFlowLayer
        simulation={simulation}
        config={config}
        palette={palette}
        animated={animated}
        scrollVelocityRef={scrollVelocityRef}
      />
      {config.showHud && (
        <group ref={hudGroupRef}>
          <HudLayer palette={palette} animated={animated} scrollRef={scrollRef} />
        </group>
      )}
      {config.showMicroDetails && (
        <group ref={microGroupRef}>
          <MicroDetailLayer palette={palette} />
        </group>
      )}
    </group>
  );
};

export default Scene;
