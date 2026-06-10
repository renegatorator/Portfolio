import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { PARTICLE_SIZE } from '@/constants/background';
import type { BackgroundPalette, ParticleSimulation } from '@/types/background';

import { createGlowTexture } from './glowTexture';

interface ParticleFieldProps {
  simulation: ParticleSimulation;
  palette: BackgroundPalette;
  animated: boolean;
}

const ParticleField = ({ simulation, palette, animated }: ParticleFieldProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const glowTexture = useMemo(() => createGlowTexture(), []);

  const geometry = useMemo(() => {
    const bufferGeometry = new THREE.BufferGeometry();
    const positionAttribute = new THREE.BufferAttribute(simulation.positions, 3);

    positionAttribute.setUsage(THREE.DynamicDrawUsage);
    bufferGeometry.setAttribute('position', positionAttribute);

    return bufferGeometry;
  }, [simulation]);

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => glowTexture.dispose(), [glowTexture]);

  useFrame(() => {
    if (animated && pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        map={glowTexture}
        color={palette.particle}
        size={PARTICLE_SIZE}
        sizeAttenuation
        transparent
        opacity={palette.particleOpacity}
        depthWrite={false}
      />
    </points>
  );
};

export default ParticleField;
